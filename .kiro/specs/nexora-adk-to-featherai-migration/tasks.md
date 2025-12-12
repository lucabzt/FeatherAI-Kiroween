# Implementation Plan

- [ ] 1. Update utility functions to support FeatherAI
  - Modify `Nexora/backend/src/agents/utils.py` to work with FeatherAI types
  - Update `create_text_query` to return strings instead of Google types.Content
  - Update `create_docs_query` to return FeatherAI Prompt objects with documents
  - Keep `load_instruction_from_file` implementation (works with both frameworks)
  - _Requirements: 11.1, 11.2, 11.4_

- [ ] 1.1 Write property test for multimodal prompt creation
  - **Property 21: Multimodal prompt creation**
  - **Validates: Requirements 11.2**

- [ ] 2. Refactor base agent classes
  - Simplify or remove `StandardAgent` and `StructuredAgent` from `Nexora/backend/src/agents/agent.py`
  - Create simplified `BaseAgent` class with common retry logic if needed
  - Remove Google ADK dependencies (LlmAgent, Runner, types.Content)
  - Preserve the `run` method signature for backward compatibility
  - _Requirements: 9.1, 9.2, 9.3_

- [ ]* 2.1 Write property test for error retry behavior
  - **Property 18: Base agent error retry behavior**
  - **Validates: Requirements 9.2**

- [ ] 3. Migrate PlannerAgent to FeatherAI
  - Update `Nexora/backend/src/agents/planner_agent/agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent
  - Configure AIAgent with `output_schema=LearningPath` for structured output
  - Update `run` method to use FeatherAI's async API
  - Handle response parsing from AIResponse objects
  - Maintain backward-compatible response format (dict with chapters array)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 3.1 Write property test for PlannerAgent schema conformance
  - **Property 1: PlannerAgent schema conformance**
  - **Validates: Requirements 1.2**

- [ ]* 3.2 Write property test for PlannerAgent output format compatibility
  - **Property 2: PlannerAgent output format compatibility**
  - **Validates: Requirements 1.4**

- [ ]* 3.3 Write property test for PlannerAgent error handling
  - **Property 3: PlannerAgent error handling**
  - **Validates: Requirements 1.5**

- [ ] 4. Migrate InfoAgent to FeatherAI
  - Update `Nexora/backend/src/agents/info_agent/agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent
  - Configure AIAgent with `output_schema=CourseInfo` for structured output
  - Update `run` method to use FeatherAI's async API
  - Ensure multimodal input handling (documents and images)
  - Evaluate MCP tools support or find alternatives
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 4.1 Write property test for InfoAgent multimodal processing
  - **Property 7: InfoAgent multimodal processing**
  - **Validates: Requirements 3.2**

- [ ]* 4.2 Write property test for InfoAgent schema conformance
  - **Property 8: InfoAgent schema conformance**
  - **Validates: Requirements 3.3**

- [ ] 5. Migrate GraderAgent to FeatherAI
  - Update `Nexora/backend/src/agents/grader_agent/agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent
  - Configure AIAgent with `output_schema=Grading` for structured output
  - Update `run` method to use FeatherAI's async API
  - Ensure output includes points and explanation fields
  - Maintain compatibility with usage logging system
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ]* 5.1 Write property test for GraderAgent schema conformance
  - **Property 9: GraderAgent schema conformance**
  - **Validates: Requirements 4.2**

- [ ]* 5.2 Write property test for GraderAgent scoring consistency
  - **Property 10: GraderAgent scoring consistency**
  - **Validates: Requirements 4.3**

- [ ]* 5.3 Write property test for GraderAgent output compatibility
  - **Property 11: GraderAgent output compatibility**
  - **Validates: Requirements 4.4**

- [ ] 6. Migrate TesterAgent to FeatherAI
  - Update `Nexora/backend/src/agents/tester_agent/agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent
  - Configure AIAgent with structured output for questions array
  - Update `run` method to use FeatherAI's async API
  - Ensure questions include all required fields for MCQ and open-text formats
  - Maintain database compatibility for question storage
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ]* 6.1 Write property test for TesterAgent schema conformance
  - **Property 14: TesterAgent schema conformance**
  - **Validates: Requirements 6.2**

- [ ]* 6.2 Write property test for TesterAgent database compatibility
  - **Property 15: TesterAgent database compatibility**
  - **Validates: Requirements 6.4**

- [ ] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Migrate ExplainerAgent to FeatherAI
  - Update `Nexora/backend/src/agents/explainer_agent/agent.py`
  - Replace Google ADK LlmAgent/LoopAgent with FeatherAI AIAgent
  - Simplify complex agent patterns if needed
  - Ensure RAG context is properly incorporated into prompts
  - Update `run` method to use FeatherAI's async API
  - Maintain expected output format for chapter content
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ]* 8.1 Write property test for ExplainerAgent RAG integration
  - **Property 12: ExplainerAgent RAG integration**
  - **Validates: Requirements 5.2**

- [ ]* 8.2 Write property test for ExplainerAgent output format
  - **Property 13: ExplainerAgent output format**
  - **Validates: Requirements 5.3**

- [ ] 9. Migrate ChatAgent to FeatherAI
  - Update `Nexora/backend/src/agents/chat_agent/agent.py`
  - Investigate if FeatherAI supports streaming responses
  - If supported: Replace Google ADK LlmAgent with FeatherAI AIAgent with streaming
  - If not supported: Document limitation and consider alternatives
  - Ensure context (chapter details, session state, history) is properly included
  - Maintain compatibility with existing streaming API
  - Handle DatabaseSessionService integration or replacement
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 9.1 Write property test for ChatAgent streaming behavior
  - **Property 4: ChatAgent streaming behavior**
  - **Validates: Requirements 2.2**

- [ ]* 9.2 Write property test for ChatAgent context inclusion
  - **Property 5: ChatAgent context inclusion**
  - **Validates: Requirements 2.3**

- [ ]* 9.3 Write property test for ChatAgent API compatibility
  - **Property 6: ChatAgent API compatibility**
  - **Validates: Requirements 2.4**

- [ ] 10. Evaluate and migrate ImageAgent
  - Investigate if FeatherAI supports image generation or retrieval
  - Update `Nexora/backend/src/agents/image_agent/agent.py` if FeatherAI supports it
  - If not supported: Document limitation and maintain existing implementation
  - Ensure image URL output format remains compatible with storage system
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 10.1 Write property test for ImageAgent URL format
  - **Property 16: ImageAgent URL format**
  - **Validates: Requirements 7.2**

- [ ] 11. Migrate FlashcardAgent components
  - Update `Nexora/backend/src/agents/flashcard_agent/learning_agent.py`
  - Update `Nexora/backend/src/agents/flashcard_agent/testing_agent.py`
  - Replace Google ADK LlmAgent with FeatherAI AIAgent for both agents
  - Maintain compatibility with existing flashcard API
  - Ensure output formats match expectations
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ]* 11.1 Write property test for FlashcardAgent API compatibility
  - **Property 17: FlashcardAgent API compatibility**
  - **Validates: Requirements 8.3, 8.4**

- [ ] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Update AgentService
  - Update `Nexora/backend/src/services/agent_service.py`
  - Remove `session_service` and `app_name` from agent initialization
  - Update all agent instantiations to use new constructors
  - Update `create_course` method to work with new agents
  - Update `grade_question` method to work with new GraderAgent
  - Handle FeatherAI AIResponse objects correctly
  - Maintain existing error handling patterns
  - Preserve cost calculation logic (adapt to FeatherAI response format)
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ]* 13.1 Write property test for AgentService async execution
  - **Property 19: AgentService async execution**
  - **Validates: Requirements 10.2**

- [ ]* 13.2 Write property test for AgentService response parsing
  - **Property 20: AgentService response parsing**
  - **Validates: Requirements 10.3**

- [ ] 14. Update chat_service.py
  - Update `Nexora/backend/src/services/chat_service.py`
  - Remove Google ADK DatabaseSessionService import if no longer needed
  - Update any session management code to work with FeatherAI or custom solution
  - Maintain existing chat API functionality
  - _Requirements: 2.5, 10.4_

- [ ] 15. Update callbacks.py
  - Update `Nexora/backend/src/agents/callbacks.py`
  - Remove Google ADK CallbackContext and LlmResponse imports
  - Evaluate if callback functionality is still needed with FeatherAI
  - If needed: Implement FeatherAI-compatible callback mechanism
  - If not needed: Remove or simplify callback code
  - _Requirements: 9.4_

- [ ] 16. Update flashcard router
  - Update `Nexora/backend/src/api/routers/flashcard.py`
  - Remove Google ADK InMemorySessionService import
  - Update flashcard endpoint to work with new FlashcardAgent implementation
  - Maintain existing API contract
  - _Requirements: 8.3, 8.4_

- [ ] 17. Remove Google ADK dependencies
  - Remove all `from google.adk` import statements from agent files
  - Remove `from google.genai import types` imports (except where still needed)
  - Update `Nexora/backend/pyproject.toml` or requirements file
  - Remove `google-adk` from dependencies
  - Add `feather-ai` to dependencies
  - Verify all imports resolve correctly
  - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ]* 17.1 Write unit test to verify no Google ADK imports
  - Scan all agent files for google.adk imports
  - **Validates: Requirements 12.1, 12.2**

- [ ] 18. Integration testing and validation
  - Test full course creation workflow end-to-end
  - Test chapter content generation with RAG context
  - Test chat interactions with conversation history
  - Test grading functionality with various answer types
  - Test question generation for different difficulty levels
  - Verify all outputs match expected formats
  - Verify database persistence works correctly
  - Test error scenarios and recovery
  - Verify cost calculation with FeatherAI responses
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ]* 18.1 Write property test for output format consistency
  - **Property 23: Output format consistency**
  - **Validates: Requirements 13.1**

- [ ]* 18.2 Write property test for error handling consistency
  - **Property 24: Error handling consistency**
  - **Validates: Requirements 13.3**

- [ ]* 18.3 Write integration tests for full workflows
  - Test complete course creation flow
  - Test chat interaction flow
  - Test grading flow
  - **Validates: Requirements 13.2, 13.4**

- [ ] 19. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

