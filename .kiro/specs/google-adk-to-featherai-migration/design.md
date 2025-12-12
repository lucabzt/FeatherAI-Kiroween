# Design Document: Google ADK to FeatherAI Migration

## Overview

This design document outlines the migration strategy for replacing Google ADK with FeatherAI in the Piatto backend. The migration will transform five agent implementations (RecipeAgent, InstructionAgent, ImageAnalyzerAgent, ImageAgent, and ChatAgent) along with their base classes and supporting utilities. The design maintains backward compatibility with existing API contracts while simplifying the codebase by leveraging FeatherAI's streamlined API.

The migration follows a component-by-component approach, starting with utility functions, then base classes, and finally individual agent implementations. This ensures that each layer is properly tested before moving to dependent components.

## Architecture

### Current Architecture (Google ADK)

```
AgentService
    ├── RecipeAgent (StructuredAgent)
    │   ├── LlmAgent (Google ADK)
    │   ├── Runner (Google ADK)
    │   └── InMemorySessionService
    ├── InstructionAgent (StructuredAgent)
    │   ├── LlmAgent (Google ADK)
    │   ├── Runner (Google ADK)
    │   └── InMemorySessionService
    ├── ImageAnalyzerAgent (StandardAgent)
    │   ├── LlmAgent (Google ADK)
    │   ├── Runner (Google ADK)
    │   └── InMemorySessionService
    ├── ImageAgent
    │   └── genai.Client (Direct Google API)
    └── ChatAgent
        └── genai.Client.aio.live (Direct Google API)
```

### Target Architecture (FeatherAI)

```
AgentService
    ├── RecipeAgent
    │   └── AIAgent (FeatherAI with output_schema)
    ├── InstructionAgent
    │   └── AIAgent (FeatherAI with output_schema)
    ├── ImageAnalyzerAgent
    │   └── AIAgent (FeatherAI with multimodal)
    ├── ImageAgent
    │   └── AIAgent (FeatherAI for image generation)
    └── ChatAgent
        └── AIAgent (FeatherAI for streaming)
```

### Key Architectural Changes

1. **Session Management**: Remove Google ADK's InMemorySessionService as FeatherAI handles conversation context through message history
2. **Base Classes**: Simplify or eliminate StandardAgent and StructuredAgent base classes since FeatherAI's AIAgent handles both cases
3. **Content Types**: Replace Google's types.Content with FeatherAI's Prompt class for multimodal inputs
4. **Streaming**: Adapt ChatAgent to use FeatherAI's response streaming capabilities
5. **Structured Output**: Use FeatherAI's output_schema parameter instead of Google ADK's output_schema configuration

## Components and Interfaces

### 1. Utility Functions (agents/utils.py)

#### create_text_query

**Current Implementation:**
```python
def create_text_query(query: str) -> types.Content:
    return types.Content(role="user", parts=[types.Part(text=query)])
```

**New Implementation:**
```python
def create_text_query(query: str) -> str:
    # FeatherAI accepts strings directly, no wrapper needed
    return query
```

**Rationale:** FeatherAI's AIAgent.run() accepts both strings and Prompt objects, simplifying the interface.

#### create_docs_query

**Current Implementation:**
```python
def create_docs_query(query: str, images: List[bytes]) -> types.Content:
    parts = [types.Part(text=query)]
    for image in images:
        parts.append(types.Part.from_bytes(data=image, mime_type="image/png"))
    return types.Content(role="user", parts=parts)
```

**New Implementation:**
```python
from feather_ai import Prompt, Document

def create_docs_query(query: str, images: List[bytes]) -> Prompt:
    documents = [
        Document.from_bytes(content=img, mime_type="image/png", filename=f"image_{i}.png")
        for i, img in enumerate(images)
    ]
    return Prompt(text=query, documents=documents)
```

**Rationale:** FeatherAI's Prompt class handles multimodal inputs with Document objects.

#### load_instruction_from_file

**Current Implementation:**
```python
def load_instruction_from_file(filename: str, default_instruction: str = "Default instruction.") -> str:
    filepath = os.path.join(os.path.dirname(__file__), filename)
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()
```

**New Implementation:**
```python
from feather_ai import load_instruction_from_file

# Use FeatherAI's built-in function, but adjust path handling
def load_instruction_from_file(filename: str, default_instruction: str = "Default instruction.") -> str:
    filepath = os.path.join(os.path.dirname(__file__), filename)
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        logger.warning(f"Instruction file not found: {filepath}. Using default.")
        return default_instruction
```

**Rationale:** Keep the existing implementation since it uses relative paths from the agents directory, while FeatherAI's version uses cwd.

### 2. Base Agent Classes (agents/agent.py)

#### StandardAgent

**Current Approach:** Complex base class with retry logic, session management, and event handling.

**New Approach:** Simplify or eliminate this base class. FeatherAI's AIAgent is simple enough that agents can instantiate it directly.

**Proposed Refactoring:**
```python
class BaseAgent:
    """Simplified base class for common agent functionality"""
    
    def __init__(self, model: str = "gemini-2.5-flash"):
        self.model = model
    
    async def run_with_retry(self, agent_func, max_retries: int = 1, retry_delay: float = 2.0):
        """Common retry logic for all agents"""
        last_error = None
        for attempt in range(max_retries + 1):
            try:
                return await agent_func()
            except Exception as e:
                if attempt >= max_retries:
                    raise
                last_error = str(e)
                logger.warning(f"[RETRY] Attempt {attempt + 1} failed: {last_error}")
                await asyncio.sleep(retry_delay)
        
        raise Exception(f"Max retries exceeded. Last error: {last_error}")
```

**Rationale:** FeatherAI handles most complexity internally. We only need shared retry logic.

#### StructuredAgent

**Current Approach:** Similar to StandardAgent but parses JSON responses.

**New Approach:** Not needed. FeatherAI's output_schema parameter handles structured output automatically.

### 3. RecipeAgent

**Current Implementation:**
```python
class RecipeAgent(StructuredAgent):
    def __init__(self, app_name: str, session_service):
        self.full_instructions = load_instruction_from_file("recipe_agent/instructions.txt")
        self.model = "gemini-2.5-flash"
        recipe_agent = LlmAgent(
            name="recipe_agent",
            model=self.model,
            description="Agent for creating custom cooking recipes.",
            output_schema=Recipes,
            instruction=self.full_instructions
        )
        self.runner = Runner(agent=recipe_agent, app_name=self.app_name, session_service=self.session_service)
```

**New Implementation:**
```python
from feather_ai import AIAgent
from ..utils import load_instruction_from_file
from .schema import Recipes

class RecipeAgent:
    def __init__(self, model: str = "gemini-2.5-flash"):
        self.model = model
        self.instructions = load_instruction_from_file("recipe_agent/instructions.txt")
        self.agent = AIAgent(
            model=self.model,
            instructions=self.instructions,
            output_schema=Recipes
        )
    
    async def run(self, user_id: str, state: dict, content: str | Prompt) -> dict:
        """
        Generate recipes based on user input.
        
        Args:
            user_id: User identifier (kept for API compatibility)
            state: State dictionary (kept for API compatibility)
            content: User query as string or Prompt object
            
        Returns:
            Dictionary with 'recipes' key containing list of Recipe objects
        """
        try:
            response = await self.agent.arun(content)
            # response.content is a Recipes Pydantic model
            return response.content.model_dump()
        except Exception as e:
            logger.error(f"RecipeAgent error: {e}")
            return {"status": "error", "message": str(e)}
```

**Rationale:** Dramatically simplified. FeatherAI's AIAgent with output_schema handles structured output automatically.

### 4. InstructionAgent

**New Implementation:**
```python
from feather_ai import AIAgent
from ..utils import load_instruction_from_file
from .schema import Instructions

class InstructionAgent:
    def __init__(self, model: str = "gemini-2.5-flash"):
        self.model = model
        self.instructions = load_instruction_from_file("instruction_agent/instructions.txt")
        self.agent = AIAgent(
            model=self.model,
            instructions=self.instructions,
            output_schema=Instructions
        )
    
    async def run(self, user_id: str, state: dict, content: str | Prompt) -> dict:
        """
        Generate cooking instructions for a recipe.
        
        Returns:
            Dictionary with 'steps' key containing list of InstructionStep objects
        """
        try:
            response = await self.agent.arun(content)
            return response.content.model_dump()
        except Exception as e:
            logger.error(f"InstructionAgent error: {e}")
            return {"status": "error", "message": str(e)}
```

**Rationale:** Same pattern as RecipeAgent - simple and clean.

### 5. ImageAnalyzerAgent

**New Implementation:**
```python
from feather_ai import AIAgent, Prompt
from ..utils import load_instruction_from_file

class ImageAnalyzerAgent:
    def __init__(self, model: str = "gemini-2.5-flash"):
        self.model = model
        self.instructions = load_instruction_from_file("image_analyzer_agent/instructions.txt")
        self.agent = AIAgent(
            model=self.model,
            instructions=self.instructions
        )
    
    async def run(self, user_id: str, state: dict, content: Prompt) -> dict:
        """
        Analyze food items in an image.
        
        Args:
            content: Prompt object containing text and image documents
            
        Returns:
            Dictionary with 'status' and 'output' keys
        """
        try:
            response = await self.agent.arun(content)
            return {
                "status": "success",
                "output": response.content
            }
        except Exception as e:
            logger.error(f"ImageAnalyzerAgent error: {e}")
            return {"status": "error", "message": str(e)}
```

**Rationale:** Uses FeatherAI's multimodal Prompt support for image analysis.

### 6. ImageAgent

**Current Implementation:** Uses Google's genai.Client directly for image generation.

**Challenge:** FeatherAI may not support image generation models like "gemini-2.5-flash-image" yet.

**New Implementation (Option 1 - If FeatherAI supports it):**
```python
from feather_ai import AIAgent
from ..utils import load_instruction_from_file

class ImageAgent:
    def __init__(self, model: str = "gemini-2.5-flash-image"):
        self.model = model
        self.instructions = load_instruction_from_file("image_agent/instructions.txt")
        self.agent = AIAgent(
            model=self.model,
            instructions=self.instructions
        )
    
    async def run(self, user_id: str, state: dict, content: str) -> bytes:
        """
        Generate an image based on text description.
        
        Returns:
            Image bytes
        """
        try:
            response = await self.agent.arun(content)
            # Assuming FeatherAI returns image bytes in response.content
            return response.content
        except Exception as e:
            logger.error(f"ImageAgent error: {e}")
            return None
```

**New Implementation (Option 2 - Keep Google API):**
```python
# Keep the existing Google genai.Client implementation
# This is acceptable as it's a direct API call, not using ADK
```

**Rationale:** Image generation may require keeping the Google API directly if FeatherAI doesn't support it yet.

### 7. ChatAgent

**Current Implementation:** Uses Google's live streaming API.

**Challenge:** FeatherAI's streaming capabilities need investigation.

**New Implementation (Streaming approach):**
```python
from feather_ai import AIAgent

class ChatAgent:
    def __init__(self, model: str = "gemini-2.5-flash"):
        self.model = model
        self.instructions = load_instruction_from_file("chat_agent/instructions.txt")
        self.agent = AIAgent(
            model=self.model,
            instructions=self.instructions
        )
    
    async def run(self, user_id: str, state: dict, content: str):
        """
        Handle conversational chat with streaming responses.
        
        Yields:
            Text chunks as they are generated
        """
        try:
            # FeatherAI doesn't have built-in streaming yet
            # We'll get the full response and yield it
            response = await self.agent.arun(content)
            
            # Simulate streaming by yielding the full response
            # In future, this could be enhanced with actual streaming
            yield response.content
            
        except Exception as e:
            logger.error(f"ChatAgent error: {e}")
            yield f"Error: {str(e)}"
```

**Alternative:** If streaming is critical, keep the Google API for ChatAgent similar to ImageAgent.

**Rationale:** FeatherAI may not support true streaming yet. We can either simulate it or keep Google's API for this specific use case.

### 8. AgentService Updates

**Key Changes:**
1. Remove `session_service` and `app_name` parameters from agent initialization
2. Update agent instantiation to use new constructors
3. Adapt response handling for FeatherAI's AIResponse objects
4. Update query creation to use new utility functions

**Updated Initialization:**
```python
class AgentService:
    def __init__(self):
        # Remove session_service - not needed with FeatherAI
        self.image_analyzer_agent = ImageAnalyzerAgent()
        self.recipe_agent = RecipeAgent()
        self.image_agent = ImageAgent()
        self.chat_agent = ChatAgent()
        self.instruction_agent = InstructionAgent()
```

**Updated analyze_ingredients:**
```python
async def analyze_ingredients(self, user_id: str, file: bytes) -> str:
    query = create_docs_query("Analyze this image for food items.", [file])
    response = await self.image_analyzer_agent.run(
        user_id=user_id,
        state={},
        content=query,
    )
    
    # Response is now a dict with 'output' key
    return response.get('output', '')
```

## Data Models

No changes to existing Pydantic schemas:
- `Recipes` and `Recipe` (recipe_agent/schema.py)
- `Instructions` and `InstructionStep` (instruction_agent/schema.py)

These schemas work directly with FeatherAI's output_schema parameter.

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Recipe output schema conformance
*For any* valid recipe generation request, the RecipeAgent output should conform to the Recipes Pydantic schema with all required fields present and correctly typed.
**Validates: Requirements 1.2**

### Property 2: Recipe output format compatibility
*For any* recipe generation request, the RecipeAgent response should be a dictionary containing a 'recipes' key with a list of recipe dictionaries, maintaining the same structure as the Google ADK implementation.
**Validates: Requirements 1.4**

### Property 3: Recipe error handling
*For any* error condition during recipe generation (invalid input, API failure, etc.), the RecipeAgent should return a dictionary with 'status': 'error' and a 'message' key containing error details.
**Validates: Requirements 1.5**

### Property 4: Instruction output schema conformance
*For any* valid instruction generation request, the InstructionAgent output should conform to the Instructions Pydantic schema.
**Validates: Requirements 2.2**

### Property 5: Instruction required fields
*For any* generated instruction step, the output should contain all required fields: 'heading', 'description', 'animation', and optionally 'timer'.
**Validates: Requirements 2.3**

### Property 6: Instruction database compatibility
*For any* instruction output, the structure should be compatible with the database schema, meaning each step can be serialized and stored without modification.
**Validates: Requirements 2.4**

### Property 7: Image analyzer multimodal processing
*For any* image analysis request with both text and image data, the ImageAnalyzerAgent should successfully process the multimodal input and return a text response.
**Validates: Requirements 3.2, 3.4**

### Property 8: Image analyzer text output
*For any* image analysis request, the ImageAnalyzerAgent should return a string containing a text description (not None, not empty for valid images).
**Validates: Requirements 3.3**

### Property 9: Image generation output format
*For any* successful image generation request, the ImageAgent should return bytes that can be decoded as a valid image file.
**Validates: Requirements 4.2**

### Property 10: Image storage compatibility
*For any* image generated by ImageAgent, the output format should be compatible with the existing storage system (can be saved using save_image_bytes).
**Validates: Requirements 4.4**

### Property 11: Chat streaming behavior
*For any* chat request, the ChatAgent should yield at least one response chunk (not return an empty generator).
**Validates: Requirements 5.2, 5.4**

### Property 12: Chat context inclusion
*For any* chat request with recipe details and conversation history, the constructed prompt should include all provided context information.
**Validates: Requirements 5.3**

### Property 13: Error retry behavior
*For any* transient error during agent execution, the retry logic should attempt the operation up to max_retries times before failing.
**Validates: Requirements 6.3**

### Property 14: AgentService async execution
*For any* agent method call through AgentService, the async execution should complete successfully and return a response in the expected format.
**Validates: Requirements 7.2**

### Property 15: AgentService response parsing
*For any* FeatherAI AIResponse object, the AgentService should correctly extract the content and handle both structured and unstructured outputs.
**Validates: Requirements 7.3**

### Property 16: Multimodal prompt creation
*For any* call to create_docs_query with text and images, the function should return a Prompt object containing Document objects for each image.
**Validates: Requirements 8.2**

### Property 17: Output format consistency
*For any* agent operation, the output format after migration should match the structure expected by existing code (same keys, same data types).
**Validates: Requirements 10.1**

### Property 18: Error handling consistency
*For any* error scenario across all agents, the system should handle failures gracefully and return error information in a consistent format.
**Validates: Requirements 10.3**

## Error Handling

### Error Categories

1. **Initialization Errors**
   - Missing instruction files
   - Invalid model names
   - Missing API keys
   - **Handling:** Log warning, use default instructions or fail fast with clear error message

2. **Runtime Errors**
   - API rate limits
   - Network failures
   - Invalid input data
   - Model errors (context length, content policy)
   - **Handling:** Retry with exponential backoff (up to max_retries), return error dict with status and message

3. **Schema Validation Errors**
   - Output doesn't match expected Pydantic schema
   - Missing required fields
   - **Handling:** Log error, attempt to parse partial response, or return error dict

4. **Multimodal Processing Errors**
   - Invalid image format
   - Unsupported MIME type
   - Image too large
   - **Handling:** Validate inputs before sending to agent, return clear error message

### Error Response Format

All agents should return errors in a consistent format:
```python
{
    "status": "error",
    "message": "Human-readable error description",
    "error_type": "InitializationError|RuntimeError|ValidationError|InputError"  # optional
}
```

### Retry Strategy

- **Max Retries:** 1 (configurable)
- **Retry Delay:** 2.0 seconds (configurable)
- **Retryable Errors:** Network errors, rate limits, transient API failures
- **Non-Retryable Errors:** Invalid input, schema validation failures, missing API keys

## Testing Strategy

### Unit Testing

1. **Utility Function Tests**
   - Test create_text_query returns correct type (string)
   - Test create_docs_query creates Prompt with Documents
   - Test load_instruction_from_file loads correct content
   - Test error handling for missing files

2. **Agent Initialization Tests**
   - Test each agent initializes with correct model
   - Test instruction loading
   - Test AIAgent creation with correct parameters

3. **Agent Execution Tests**
   - Test RecipeAgent with sample recipe request
   - Test InstructionAgent with sample recipe data
   - Test ImageAnalyzerAgent with sample image
   - Test error handling for each agent

4. **AgentService Tests**
   - Test agent initialization in AgentService
   - Test analyze_ingredients method
   - Test generate_recipe method
   - Test generate_instruction method
   - Test ask_question method

### Property-Based Testing

Property-based tests will use **Hypothesis** (Python's PBT library) to generate random inputs and verify properties hold across all cases.

**Configuration:** Each property test should run a minimum of 100 iterations.

**Test Tagging:** Each property-based test must include a comment with the format:
```python
# Feature: google-adk-to-featherai-migration, Property X: [property description]
```

### Integration Testing

1. **End-to-End Recipe Generation**
   - Test full workflow: analyze ingredients → generate recipes → generate instructions → generate images
   - Verify data flows correctly through all agents
   - Verify database persistence works

2. **Chat Interaction Flow**
   - Test creating cooking session
   - Test asking questions with context
   - Test conversation history management

3. **Error Recovery**
   - Test system behavior when agents fail
   - Test retry logic
   - Test graceful degradation

### Migration Validation

1. **Output Comparison**
   - Run same inputs through old (Google ADK) and new (FeatherAI) implementations
   - Compare output structures (not exact content, as LLM outputs vary)
   - Verify schema conformance

2. **Performance Testing**
   - Measure response times before and after migration
   - Verify no significant performance degradation
   - Test concurrent request handling

3. **Dependency Verification**
   - Verify no google.adk imports remain
   - Verify feather-ai is in dependencies
   - Verify all imports resolve correctly

## Implementation Notes

### Model Compatibility

FeatherAI supports multiple model providers. The current Piatto implementation uses:
- `gemini-2.5-flash` - Supported by FeatherAI ✓
- `gemini-2.5-flash-image` - May not be supported by FeatherAI ⚠️
- `gemini-live-2.5-flash-preview` - May not be supported by FeatherAI ⚠️

**Decision:** 
- For standard text/multimodal agents: Use FeatherAI
- For image generation: Keep Google API directly if FeatherAI doesn't support it
- For live streaming chat: Keep Google API directly if FeatherAI doesn't support it

### Session Management

Google ADK's InMemorySessionService is not needed with FeatherAI because:
1. FeatherAI manages conversation context through message history
2. Piatto's agents are mostly stateless (each request is independent)
3. For ChatAgent, conversation history is managed in the database and passed as context

**Decision:** Remove session_service completely from agent initialization.

### Backward Compatibility

To maintain backward compatibility with existing code:
1. Keep the same method signatures: `async def run(user_id: str, state: dict, content: ...)`
2. Keep the same response formats (dicts with specific keys)
3. Keep the same error handling patterns
4. Keep utility function names and signatures

### Migration Path

1. **Phase 1:** Update utility functions (utils.py)
2. **Phase 2:** Refactor base classes (agent.py)
3. **Phase 3:** Migrate RecipeAgent and InstructionAgent (structured output)
4. **Phase 4:** Migrate ImageAnalyzerAgent (multimodal)
5. **Phase 5:** Evaluate ImageAgent and ChatAgent (may keep Google API)
6. **Phase 6:** Update AgentService
7. **Phase 7:** Update dependencies and remove Google ADK imports
8. **Phase 8:** Testing and validation

### Rollback Strategy

If issues arise during migration:
1. Keep Google ADK code in a separate branch
2. Use feature flags to switch between implementations
3. Monitor error rates and performance metrics
4. Have rollback plan ready for production deployment

## Open Questions

1. **Image Generation:** Does FeatherAI support image generation models? If not, should we keep Google API for ImageAgent?
2. **Streaming:** Does FeatherAI support streaming responses? If not, should we keep Google API for ChatAgent?
3. **Model Names:** Are all Gemini model names compatible with FeatherAI's provider system?
4. **Rate Limiting:** Does FeatherAI handle rate limiting automatically, or do we need custom logic?
5. **Tracing/Logging:** Does FeatherAI provide built-in tracing/logging capabilities similar to Google ADK?

These questions should be answered during implementation by testing FeatherAI's capabilities.
