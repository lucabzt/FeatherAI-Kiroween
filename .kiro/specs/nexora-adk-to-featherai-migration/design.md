# Design Document

## Overview

This design document outlines the migration strategy for transitioning the Nexora backend from Google ADK to FeatherAI. The migration will replace all Google ADK agent implementations with FeatherAI equivalents while maintaining backward compatibility with existing APIs and database schemas.

The Nexora platform uses multiple specialized AI agents for course creation, content generation, student interaction, and assessment. Each agent currently uses Google ADK's LlmAgent, Runner, and session management. The migration will replace these with FeatherAI's AIAgent, which provides a simpler API with built-in support for structured output, multimodal inputs, and async execution.

## Architecture

### Current Architecture (Google ADK)

```
AgentService
├── PlannerAgent (StructuredAgent)
│   ├── LlmAgent (Google ADK)
│   ├── Runner
│   └── InMemorySessionService
├── ChatAgent
│   ├── LlmAgent (Google ADK)
│   ├── Runner
│   └── DatabaseSessionService
├── InfoAgent (StructuredAgent)
├── GraderAgent (StructuredAgent)
├── ExplainerAgent
├── TesterAgent (StructuredAgent)
├── ImageAgent
└── FlashcardAgent (Learning & Testing)
```

### Target Architecture (FeatherAI)

```
AgentService
├── PlannerAgent
│   └── AIAgent (FeatherAI) with output_schema
├── ChatAgent
│   └── AIAgent (FeatherAI) with streaming
├── InfoAgent
│   └── AIAgent (FeatherAI) with output_schema
├── GraderAgent
│   └── AIAgent (FeatherAI) with output_schema
├── ExplainerAgent
│   └── AIAgent (FeatherAI)
├── TesterAgent
│   └── AIAgent (FeatherAI) with output_schema
├── ImageAgent
│   └── AIAgent (FeatherAI) or fallback to Google API
└── FlashcardAgent
    └── AIAgent (FeatherAI) with output_schema
```

## Components and Interfaces

### 1. Base Agent Classes

**Current Implementation:**
- `StandardAgent`: Base class for agents returning unstructured text
- `StructuredAgent`: Base class for agents returning structured JSON

**New Implementation:**
- Simplify or remove base classes since FeatherAI's AIAgent handles both cases
- Create a minimal `BaseAgent` wrapper if needed for common retry logic
- Each agent will directly instantiate `AIAgent` with appropriate configuration

### 2. Utility Functions

**Module:** `Nexora/backend/src/agents/utils.py`

**Functions to Update:**

```python
# Current: Returns Google types.Content
def create_text_query(query: str) -> types.Content

# New: Returns string (FeatherAI accepts strings directly)
def create_text_query(query: str) -> str

# Current: Returns Google types.Content with multimodal parts
def create_docs_query(query: str, docs: List[Document], images: List[Image]) -> types.Content

# New: Returns FeatherAI Prompt object
def create_docs_query(query: str, docs: List[Document], images: List[Image]) -> Prompt

# Keep as-is (works with both frameworks)
def load_instruction_from_file(filename: str) -> str
```

### 3. Individual Agents

#### PlannerAgent

**Current:**
```python
LlmAgent(
    name="planner_agent",
    model=self.model,
    output_schema=LearningPath,
    instruction=self.full_instructions,
)
```

**New:**
```python
AIAgent(
    model=self.model,
    instructions=self.full_instructions,
    output_schema=LearningPath
)
```

#### ChatAgent

**Current:**
- Uses `DatabaseSessionService` for persistent sessions
- Streams responses using `RunConfig(streaming_mode=StreamingMode.SSE)`
- Yields text parts as they arrive

**New:**
- Evaluate FeatherAI's streaming capabilities
- If supported: Use `AIAgent` with async streaming
- If not: Document limitation and consider alternatives
- Session management may need custom implementation

#### InfoAgent

**Current:**
- Uses `LlmAgent` with `output_schema=CourseInfo`
- Processes multimodal input (documents and images)

**New:**
```python
AIAgent(
    model=self.model,
    instructions=self.full_instructions,
    output_schema=CourseInfo
)
```

#### GraderAgent

**Current:**
```python
LlmAgent(
    name="grader_agent",
    model=self.model,
    output_schema=Grading,
    instruction=lambda _: self.full_instructions,
)
```

**New:**
```python
AIAgent(
    model=self.model,
    instructions=self.full_instructions,
    output_schema=Grading
)
```

#### ExplainerAgent

**Current:**
- May use `LoopAgent` or complex patterns
- Generates chapter content with RAG context

**New:**
- Simplify to single `AIAgent` if possible
- Incorporate RAG context into prompt

#### TesterAgent

**Current:**
- Generates quiz questions (MCQ and open-text)
- Returns structured output with questions array

**New:**
```python
AIAgent(
    model=self.model,
    instructions=self.full_instructions,
    output_schema=Questions  # Schema with questions array
)
```

#### ImageAgent

**Current:**
- Generates or retrieves course/chapter images
- Returns image URLs

**New:**
- Evaluate if FeatherAI supports image generation
- If not: Keep existing implementation or use external API
- Document any limitations

#### FlashcardAgent

**Current:**
- Two agents: LearningAgent and TestingAgent
- Both use `LlmAgent`

**New:**
- Migrate both to `AIAgent`
- Maintain separate agents for learning and testing

### 4. AgentService

**Module:** `Nexora/backend/src/services/agent_service.py`

**Changes:**
- Remove `session_service` and `app_name` from agent initialization
- Update agent instantiation to use FeatherAI patterns
- Update response handling to work with FeatherAI's `AIResponse` objects
- Maintain existing error handling and retry logic
- Keep cost calculation logic (adapt to FeatherAI response format)

**Example:**
```python
# Current
self.planner_agent = PlannerAgent(self.app_name, self.session_service)
response = await self.planner_agent.run(user_id, state, content)

# New
self.planner_agent = PlannerAgent()
response = await self.planner_agent.run(user_id, state, content)
```

## Data Models

### Response Format

**Current (Google ADK):**
```python
{
    "status": "success",
    "output": "...",  # or structured dict
    "inputs": [...],
    "outputs": [...],
    "model": "gemini-2.0-flash"
}
```

**New (FeatherAI):**
```python
# AIResponse object with:
# - content: str or structured dict
# - tool_calls: list
# - model: str
# - usage: dict (tokens)

# Adapt to maintain compatibility:
{
    "status": "success",
    "output": response.content,
    "inputs": [instructions, query],
    "outputs": [response.content],
    "model": response.model
}
```

### Pydantic Schemas

All existing Pydantic schemas remain unchanged:
- `LearningPath` (PlannerAgent)
- `CourseInfo` (InfoAgent)
- `Grading` (GraderAgent)
- `Questions` (TesterAgent)
- Flashcard schemas

FeatherAI's `output_schema` parameter accepts Pydantic models directly.

## Corre
ctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: PlannerAgent schema conformance
*For any* course planning request, the PlannerAgent output should conform to the LearningPath Pydantic schema
**Validates: Requirements 1.2**

Property 2: PlannerAgent output format compatibility
*For any* course planning request, the PlannerAgent response should contain a chapters array in the same format as the original Google ADK implementation
**Validates: Requirements 1.4**

Property 3: PlannerAgent error handling
*For any* invalid or error-inducing input, the PlannerAgent should return an error response with an appropriate error message
**Validates: Requirements 1.5**

Property 4: ChatAgent streaming behavior
*For any* student question, the ChatAgent should yield response text incrementally (if streaming is supported)
**Validates: Requirements 2.2**

Property 5: ChatAgent context inclusion
*For any* chat request, the ChatAgent should receive chapter details, session state, and conversation history in its context
**Validates: Requirements 2.3**

Property 6: ChatAgent API compatibility
*For any* chat interaction, the ChatAgent response format should match the existing streaming API expectations
**Validates: Requirements 2.4**

Property 7: InfoAgent multimodal processing
*For any* combination of course documents and images, the InfoAgent should successfully process the multimodal input
**Validates: Requirements 3.2**

Property 8: InfoAgent schema conformance
*For any* course info generation request, the InfoAgent output should contain title and description fields conforming to the CourseInfo schema
**Validates: Requirements 3.3**

Property 9: GraderAgent schema conformance
*For any* grading request with question, correct answer, and student answer, the GraderAgent should return structured output with points and explanation fields
**Validates: Requirements 4.2**

Property 10: GraderAgent scoring consistency
*For any* set of known answer pairs, the GraderAgent should maintain consistent scoring logic and point scale
**Validates: Requirements 4.3**

Property 11: GraderAgent output compatibility
*For any* grading result, the output format should be compatible with the existing usage logging system
**Validates: Requirements 4.4**

Property 12: ExplainerAgent RAG integration
*For any* chapter generation request with RAG context, the ExplainerAgent should incorporate the retrieved course documents into its prompt
**Validates: Requirements 5.2**

Property 13: ExplainerAgent output format
*For any* chapter content generation, the ExplainerAgent should return output in the expected format for chapter content storage
**Validates: Requirements 5.3**

Property 14: TesterAgent schema conformance
*For any* question generation request, the TesterAgent should return structured output with a questions array containing properly formatted MCQ and open-text questions
**Validates: Requirements 6.2**

Property 15: TesterAgent database compatibility
*For any* generated question set, the questions should be compatible with the existing database schema (with answer_a/b/c/d for MCQ or correct_answer for open-text)
**Validates: Requirements 6.4**

Property 16: ImageAgent URL format
*For any* image generation or retrieval request, the ImageAgent should return image URLs in a format compatible with the existing storage system
**Validates: Requirements 7.2**

Property 17: FlashcardAgent API compatibility
*For any* flashcard request, the flashcard agents should return responses matching the existing flashcard API format
**Validates: Requirements 8.3, 8.4**

Property 18: Base agent error retry behavior
*For any* transient error during agent execution, the system should retry the operation according to the existing retry logic
**Validates: Requirements 9.2**

Property 19: AgentService async execution
*For any* agent method call through AgentService, the execution should be asynchronous and complete successfully
**Validates: Requirements 10.2**

Property 20: AgentService response parsing
*For any* FeatherAI response object, the AgentService should correctly parse it into the expected response format with status, output, inputs, outputs, and model fields
**Validates: Requirements 10.3**

Property 21: Multimodal prompt creation
*For any* combination of query text, documents, and images, create_docs_query should produce a valid FeatherAI Prompt object with all content included
**Validates: Requirements 11.2**

Property 22: Utility function compatibility
*For any* agent using the updated utility functions, the agent should continue to function correctly with the new implementations
**Validates: Requirements 11.4**

Property 23: Output format consistency
*For any* migrated agent, the output format should match the format produced by the original Google ADK implementation
**Validates: Requirements 13.1**

Property 24: Error handling consistency
*For any* error scenario across all agents, the system should handle failures gracefully with appropriate error messages
**Validates: Requirements 13.3**

## Error Handling

### Retry Logic

All agents will maintain the existing retry logic:
- Maximum retries: 1 (configurable)
- Retry delay: 2.0 seconds (configurable)
- Retry on: Transient errors, JSON parsing failures, escalation events

### Error Response Format

```python
{
    "status": "error",
    "message": "Descriptive error message",
    "model": "model-name"  # if available
}
```

### Error Scenarios

1. **Network Errors**: Retry with exponential backoff
2. **JSON Parsing Errors**: Retry if within retry limit, otherwise return error
3. **Schema Validation Errors**: Return error immediately (no retry)
4. **Agent Escalation**: Retry if within retry limit
5. **Timeout Errors**: Return error with timeout message

## Testing Strategy

### Unit Testing

Unit tests will cover:
- Individual agent initialization with FeatherAI
- Utility function conversions (create_text_query, create_docs_query)
- Response parsing and format conversion
- Error handling and retry logic
- Schema validation for structured outputs

### Property-Based Testing

Property-based tests will use **Hypothesis** (Python's PBT library) to verify:
- Schema conformance across random inputs
- Output format consistency
- Error handling behavior
- Multimodal prompt creation
- Response parsing correctness

Each property-based test will:
- Run a minimum of 100 iterations
- Be tagged with the format: `**Feature: nexora-adk-to-featherai-migration, Property {number}: {property_text}**`
- Reference the specific correctness property from this design document

### Integration Testing

Integration tests will verify:
- Full course creation workflow
- Agent coordination through AgentService
- Database persistence of agent outputs
- Cost calculation with FeatherAI responses
- Streaming behavior for ChatAgent

### Migration Validation

Validation tests will ensure:
- No `google.adk` imports remain in agent code
- No `google.genai.types` imports for agent functionality
- `feather-ai` is added to dependencies
- `google-adk` is removed from dependencies
- All agents produce compatible output formats

## Implementation Notes

### FeatherAI Capabilities to Verify

1. **Streaming Support**: Check if FeatherAI supports streaming responses for ChatAgent
2. **MCP Tools**: Evaluate if FeatherAI supports MCP toolsets for InfoAgent
3. **Image Generation**: Determine if FeatherAI can generate images or if ImageAgent needs alternative
4. **Session Management**: Assess if FeatherAI provides session management or if custom solution needed

### Backward Compatibility

To maintain backward compatibility:
- Keep the `run()` method signature: `async def run(user_id, state, content, debug=False)`
- Maintain response format with status, output, inputs, outputs, model fields
- Preserve error handling patterns
- Keep cost calculation interface

### Performance Considerations

- FeatherAI's simpler API may reduce overhead compared to Google ADK's Runner/Session architecture
- Async execution patterns should be maintained for parallel agent processing
- Monitor token usage and costs with FeatherAI's pricing model

### Migration Strategy

1. **Phase 1**: Update utility functions and base classes
2. **Phase 2**: Migrate simple structured agents (PlannerAgent, InfoAgent, GraderAgent, TesterAgent)
3. **Phase 3**: Migrate complex agents (ExplainerAgent, ChatAgent)
4. **Phase 4**: Evaluate and migrate ImageAgent and FlashcardAgents
5. **Phase 5**: Update AgentService and remove Google ADK dependencies
6. **Phase 6**: Integration testing and validation

