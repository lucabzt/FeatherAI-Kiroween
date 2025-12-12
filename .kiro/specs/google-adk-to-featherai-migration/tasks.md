# Implementation Plan

- [x] 1. Update utility functions to support FeatherAI
  - Modify `Piatto/backend/src/agents/utils.py` to work with FeatherAI types
  - Update `create_text_query` to return strings instead of Google types.Content
  - Update `create_docs_query` to return FeatherAI Prompt objects with Documents
  - Keep `load_instruction_from_file` implementation (works with both frameworks)
  - _Requirements: 8.1, 8.2, 8.3_

- [ ]* 1.1 Write property test for create_docs_query
  - **Property 16: Multimodal prompt creation**
  - **Validates: Requirements 8.2**

- [-] 2. Refactor base agent classes
  - Simplify or remove `StandardAgent` and `StructuredAgent` from `Piatto/backend/src/agents/agent.py`
  - Create simplified `BaseAgent` class with common retry logic
  - Remove Google ADK dependencies (LlmAgent, Runner, types.Content)
  - Preserve the `run` method signature for backward compatibility
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ]* 2.1 Write property test for error retry behavior
  - **Property 13: Error retry behavior**
  - **Validates: Requirements 6.3**

- [ ] 3. Migrate RecipeAgent to FeatherAI
  - Update `Piatto/backend/src/agents/recipe_agent/agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent
  - Configure AIAgent with `output_schema=Recipes` for structured output
  - Update `run` method to use FeatherAI's async API
  - Handle response parsing from AIResponse objects
  - Maintain backward-compatible response format (dict with 'recipes' key)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 3.1 Write property test for recipe schema conformance
  - **Property 1: Recipe output schema conformance**
  - **Validates: Requirements 1.2**

- [ ]* 3.2 Write property test for recipe output format compatibility
  - **Property 2: Recipe output format compatibility**
  - **Validates: Requirements 1.4**

- [ ]* 3.3 Write property test for recipe error handling
  - **Property 3: Recipe error handling**
  - **Validates: Requirements 1.5**

- [ ] 4. Migrate InstructionAgent to FeatherAI
  - Update `Piatto/backend/src/agents/instruction_agent/agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent
  - Configure AIAgent with `output_schema=Instructions` for structured output
  - Update `run` method to use FeatherAI's async API
  - Ensure output includes all required fields (heading, description, animation, timer)
  - Maintain database compatibility for instruction steps
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ]* 4.1 Write property test for instruction schema conformance
  - **Property 4: Instruction output schema conformance**
  - **Validates: Requirements 2.2**

- [ ]* 4.2 Write property test for instruction required fields
  - **Property 5: Instruction required fields**
  - **Validates: Requirements 2.3**

- [ ]* 4.3 Write property test for instruction database compatibility
  - **Property 6: Instruction database compatibility**
  - **Validates: Requirements 2.4**

- [ ] 5. Migrate ImageAnalyzerAgent to FeatherAI
  - Update `Piatto/backend/src/agents/image_analyzer_agent/agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent
  - Update to use FeatherAI's Prompt class for multimodal inputs
  - Ensure proper handling of image documents
  - Return text description in the expected format
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 5.1 Write property test for multimodal processing
  - **Property 7: Image analyzer multimodal processing**
  - **Validates: Requirements 3.2, 3.4**

- [ ]* 5.2 Write property test for text output format
  - **Property 8: Image analyzer text output**
  - **Validates: Requirements 3.3**

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Evaluate and migrate ImageAgent
  - Investigate if FeatherAI supports image generation models
  - If supported: Update `Piatto/backend/src/agents/image_agent/agent.py` to use FeatherAI
  - If not supported: Keep Google genai.Client implementation with documentation
  - Ensure image bytes output format remains compatible with storage system
  - _Requirements: 4.1, 4.2, 4.4_

- [ ]* 7.1 Write property test for image output format
  - **Property 9: Image generation output format**
  - **Validates: Requirements 4.2**

- [ ]* 7.2 Write property test for image storage compatibility
  - **Property 10: Image storage compatibility**
  - **Validates: Requirements 4.4**

- [ ] 8. Evaluate and migrate ChatAgent
  - Investigate if FeatherAI supports streaming responses
  - If supported: Update `Piatto/backend/src/agents/chat_agent/agent.py` to use FeatherAI
  - If not supported: Keep Google genai.Client.aio.live implementation with documentation
  - Ensure streaming capability is maintained
  - Ensure context (recipe, session, history) is properly included
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 8.1 Write property test for streaming behavior
  - **Property 11: Chat streaming behavior**
  - **Validates: Requirements 5.2, 5.4**

- [ ]* 8.2 Write property test for context inclusion
  - **Property 12: Chat context inclusion**
  - **Validates: Requirements 5.3**

- [ ] 9. Update AgentService
  - Update `Piatto/backend/src/services/agent_service.py`
  - Remove `session_service` and `app_name` from agent initialization
  - Update all agent instantiations to use new constructors
  - Update `analyze_ingredients` to work with new ImageAnalyzerAgent
  - Update `generate_recipe` to work with new RecipeAgent
  - Update `generate_instruction` to work with new InstructionAgent
  - Update `ask_question` to work with new ChatAgent
  - Handle FeatherAI AIResponse objects correctly
  - Maintain existing error handling patterns
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 9.1 Write property test for async execution
  - **Property 14: AgentService async execution**
  - **Validates: Requirements 7.2**

- [ ]* 9.2 Write property test for response parsing
  - **Property 15: AgentService response parsing**
  - **Validates: Requirements 7.3**

- [ ] 10. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Remove Google ADK dependencies
  - Remove all `from google.adk` import statements
  - Remove `from google.genai import types` imports (except for agents that still use Google API directly)
  - Update `Piatto/backend/pyproject.toml` or requirements file
  - Remove `google-adk` from dependencies
  - Add `feather-ai` to dependencies
  - Verify all imports resolve correctly
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ]* 11.1 Write unit test to verify no Google ADK imports
  - Scan all agent files for google.adk imports
  - **Validates: Requirements 9.1, 9.2**

- [ ] 12. Integration testing and validation
  - Test full recipe generation workflow end-to-end
  - Test instruction generation with various recipes
  - Test image analysis with sample images
  - Test chat interactions with conversation history
  - Verify all outputs match expected formats
  - Verify database persistence works correctly
  - Test error scenarios and recovery
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ]* 12.1 Write property test for output format consistency
  - **Property 17: Output format consistency**
  - **Validates: Requirements 10.1**

- [ ]* 12.2 Write property test for error handling consistency
  - **Property 18: Error handling consistency**
  - **Validates: Requirements 10.3**

- [ ]* 12.3 Write integration tests for full workflows
  - Test complete recipe generation flow
  - Test chat interaction flow
  - **Validates: Requirements 10.2, 10.4**

- [ ] 13. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
