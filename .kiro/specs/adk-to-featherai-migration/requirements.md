# Requirements Document

## Introduction

This document outlines the requirements for migrating the Piatto backend from Google ADK (Agent Development Kit) to FeatherAI. The migration involves replacing all Google ADK-specific code with FeatherAI equivalents while maintaining the same functionality and API contracts. The system currently uses Google ADK for agent orchestration, session management, and structured output generation across multiple specialized agents (recipe generation, instruction generation, image analysis, image generation, and chat).

## Glossary

- **FeatherAI**: A Python framework for building AI agents with support for tool calling, structured output, and multimodal inputs
- **Google ADK**: Google's Agent Development Kit, the current framework being replaced
- **Agent**: An AI-powered component that performs specific tasks (e.g., recipe generation, image analysis)
- **Structured Output**: AI responses that conform to a predefined Pydantic schema
- **Session Service**: A service that manages conversation state and history
- **Multimodal Input**: Input that includes both text and images/documents
- **Streaming Response**: Real-time token-by-token response delivery
- **Agent Service**: The orchestration layer that coordinates multiple agents

## Requirements

### Requirement 1

**User Story:** As a developer, I want to replace Google ADK with FeatherAI, so that the system uses a unified framework for agent development.

#### Acceptance Criteria

1. WHEN the system initializes agents THEN FeatherAI SHALL be used instead of Google ADK
2. WHEN importing agent dependencies THEN the system SHALL import from feather_ai instead of google.adk
3. WHEN the application starts THEN no Google ADK imports SHALL remain in the codebase except for type definitions if absolutely necessary
4. WHEN agents are instantiated THEN they SHALL use FeatherAI's AIAgent class
5. WHEN the system runs THEN all Google ADK session services SHALL be replaced with FeatherAI equivalents or removed if not needed

### Requirement 2

**User Story:** As a developer, I want agents to produce structured output using FeatherAI, so that responses conform to predefined schemas.

#### Acceptance Criteria

1. WHEN the RecipeAgent generates recipes THEN the output SHALL conform to the Recipes Pydantic schema using FeatherAI's output_schema parameter
2. WHEN the InstructionAgent generates instructions THEN the output SHALL conform to the Instructions Pydantic schema using FeatherAI's output_schema parameter
3. WHEN structured agents return responses THEN the responses SHALL be valid Pydantic model instances or dictionaries
4. WHEN parsing structured output THEN the system SHALL handle FeatherAI's response format correctly
5. WHEN structured output fails validation THEN the system SHALL provide clear error messages

### Requirement 3

**User Story:** As a developer, I want to load system instructions from files, so that agent behavior is configurable and maintainable.

#### Acceptance Criteria

1. WHEN agents are initialized THEN system instructions SHALL be loaded from text files using the existing load_instruction_from_file utility
2. WHEN FeatherAI agents are created THEN instructions SHALL be passed via the instructions parameter
3. WHEN instruction files are missing THEN the system SHALL use default instructions and log a warning
4. WHEN multiple instruction files exist THEN the system SHALL support loading and combining them
5. WHEN instructions are updated THEN agents SHALL use the new instructions without code changes

### Requirement 4

**User Story:** As a developer, I want to handle multimodal inputs with FeatherAI, so that agents can process both text and images.

#### Acceptance Criteria

1. WHEN the ImageAnalyzerAgent receives image input THEN it SHALL process the image using FeatherAI's Prompt class with documents parameter
2. WHEN creating multimodal queries THEN the system SHALL use FeatherAI's Prompt class instead of types.Content
3. WHEN images are passed to agents THEN they SHALL be properly formatted as document paths or bytes
4. WHEN text and images are combined THEN the Prompt class SHALL handle both seamlessly
5. WHEN multimodal input is invalid THEN the system SHALL raise appropriate errors

### Requirement 5

**User Story:** As a developer, I want the ChatAgent to stream responses, so that users receive real-time feedback.

#### Acceptance Criteria

1. WHEN the ChatAgent processes a query THEN it SHALL stream responses token-by-token using FeatherAI's async streaming
2. WHEN streaming responses THEN each chunk SHALL be yielded as it becomes available
3. WHEN streaming completes THEN all chunks SHALL have been delivered
4. WHEN streaming encounters an error THEN the error SHALL be handled gracefully
5. WHEN the client disconnects THEN streaming SHALL stop cleanly

### Requirement 6

**User Story:** As a developer, I want to remove session management complexity, so that the codebase is simpler and more maintainable.

#### Acceptance Criteria

1. WHEN agents run THEN they SHALL NOT require InMemorySessionService or similar session management
2. WHEN the AgentService is initialized THEN it SHALL NOT create session service instances
3. WHEN agents are called THEN they SHALL operate statelessly or manage state internally
4. WHEN removing session services THEN all references to session_id and user_id in agent calls SHALL be removed or simplified
5. WHEN the migration is complete THEN the codebase SHALL have fewer dependencies

### Requirement 7

**User Story:** As a developer, I want to maintain the existing agent API contracts, so that the rest of the application continues to work without changes.

#### Acceptance Criteria

1. WHEN the AgentService methods are called THEN they SHALL maintain the same signatures and return types
2. WHEN agents return responses THEN the response format SHALL match the existing format expected by callers
3. WHEN errors occur THEN they SHALL be handled and returned in the same format as before
4. WHEN the migration is complete THEN all existing API endpoints SHALL continue to function
5. WHEN integration tests run THEN they SHALL pass without modification

### Requirement 8

**User Story:** As a developer, I want to handle image generation with FeatherAI, so that recipe images are generated correctly.

#### Acceptance Criteria

1. WHEN the ImageAgent generates images THEN it SHALL use FeatherAI's image generation capabilities
2. WHEN image generation completes THEN the output SHALL be returned as bytes
3. WHEN image generation fails THEN the system SHALL handle errors gracefully
4. WHEN images are saved THEN they SHALL be in the correct format (PNG)
5. WHEN multiple images are generated concurrently THEN all SHALL complete successfully

### Requirement 9

**User Story:** As a developer, I want to simplify the agent base classes, so that the code is easier to understand and maintain.

#### Acceptance Criteria

1. WHEN the StandardAgent base class is refactored THEN it SHALL use FeatherAI's AIAgent directly
2. WHEN the StructuredAgent base class is refactored THEN it SHALL use FeatherAI's output_schema parameter
3. WHEN agents inherit from base classes THEN they SHALL have minimal boilerplate
4. WHEN retry logic is needed THEN it SHALL be implemented cleanly without complex event loops
5. WHEN the base classes are simplified THEN all derived agents SHALL continue to function

### Requirement 10

**User Story:** As a developer, I want to use FeatherAI's async capabilities, so that the system remains performant and responsive.

#### Acceptance Criteria

1. WHEN agents are called asynchronously THEN they SHALL use FeatherAI's arun method
2. WHEN multiple agents run concurrently THEN they SHALL use asyncio.gather or asyncio.create_task
3. WHEN async operations complete THEN results SHALL be returned correctly
4. WHEN async operations fail THEN exceptions SHALL be propagated appropriately
5. WHEN the system is under load THEN async operations SHALL not block each other
