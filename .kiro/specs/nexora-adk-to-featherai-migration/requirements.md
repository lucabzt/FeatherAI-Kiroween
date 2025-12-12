# Requirements Document

## Introduction

This document outlines the requirements for migrating the Nexora backend from Google ADK (Agent Development Kit) to FeatherAI. The migration involves replacing all Google ADK agent implementations with FeatherAI equivalents while maintaining the same functionality and API contracts. Nexora is an AI-powered personalized learning platform that uses multiple specialized agents for course creation, content generation, student interaction, and assessment.

## Glossary

- **Google ADK**: Google's Agent Development Kit, the current framework used for AI agent implementations
- **FeatherAI**: The target framework for AI agent implementations, a lightweight alternative to Google ADK
- **Nexora Backend**: The backend system for an AI-powered personalized learning platform
- **Agent**: An AI-powered component that processes user requests and generates responses
- **PlannerAgent**: Agent responsible for creating learning paths and course structures
- **ChatAgent**: Agent that handles conversational interactions with students per chapter
- **InfoAgent**: Agent that generates course titles and descriptions
- **GraderAgent**: Agent that evaluates student answers to open-text questions
- **ExplainerAgent**: Agent that creates educational content for course chapters
- **TesterAgent**: Agent that generates quiz questions (MCQ and fill-in-the-blank)
- **ImageAgent**: Agent that generates or retrieves course and chapter images
- **FlashcardAgent**: Agents for flashcard-based learning and testing
- **AgentService**: Service layer that coordinates interactions between all agents
- **StructuredAgent**: Base class for agents that return structured JSON output conforming to Pydantic schemas
- **Session Service**: Component managing agent conversation sessions and state
- **RAG**: Retrieval-Augmented Generation, used for incorporating course documents into agent context
- **ChromaDB**: Vector database used for storing and retrieving course content

## Requirements

### Requirement 1

**User Story:** As a developer, I want to migrate the PlannerAgent from Google ADK to FeatherAI, so that learning path and course structure generation uses the new framework.

#### Acceptance Criteria

1. WHEN the PlannerAgent is initialized THEN the system SHALL use FeatherAI's AIAgent instead of Google ADK's LlmAgent
2. WHEN the PlannerAgent receives a course planning request THEN the system SHALL return structured output conforming to the LearningPath Pydantic schema
3. WHEN the PlannerAgent processes a request THEN the system SHALL load instructions from the same instruction file used previously
4. WHEN the PlannerAgent completes execution THEN the system SHALL return results with chapters array in the same format as the original implementation
5. WHEN the PlannerAgent encounters an error THEN the system SHALL handle it gracefully with appropriate error messages

### Requirement 2

**User Story:** As a developer, I want to migrate the ChatAgent from Google ADK to FeatherAI, so that student-chapter interactions use the new framework.

#### Acceptance Criteria

1. WHEN the ChatAgent is initialized THEN the system SHALL use FeatherAI's AIAgent for conversational responses
2. WHEN the ChatAgent receives a student question THEN the system SHALL stream responses back to the client if FeatherAI supports streaming
3. WHEN the ChatAgent processes context THEN the system SHALL include chapter details, session state, and conversation history
4. WHEN the ChatAgent generates responses THEN the system SHALL maintain compatibility with the existing streaming API
5. WHEN the ChatAgent manages sessions THEN the system SHALL use FeatherAI's session management or adapt the existing DatabaseSessionService

### Requirement 3

**User Story:** As a developer, I want to migrate the InfoAgent from Google ADK to FeatherAI, so that course metadata generation uses the new framework.

#### Acceptance Criteria

1. WHEN the InfoAgent is initialized THEN the system SHALL use FeatherAI's AIAgent with structured output support
2. WHEN the InfoAgent receives course documents and images THEN the system SHALL process multimodal input using FeatherAI's capabilities
3. WHEN the InfoAgent generates course info THEN the system SHALL return structured output with title and description fields
4. WHEN the InfoAgent uses MCP tools THEN the system SHALL evaluate if FeatherAI supports MCP toolsets or find alternatives

### Requirement 4

**User Story:** As a developer, I want to migrate the GraderAgent from Google ADK to FeatherAI, so that student answer evaluation uses the new framework.

#### Acceptance Criteria

1. WHEN the GraderAgent is initialized THEN the system SHALL use FeatherAI's AIAgent with structured output support
2. WHEN the GraderAgent receives a question, correct answer, and student answer THEN the system SHALL return structured output with points and explanation fields
3. WHEN the GraderAgent evaluates answers THEN the system SHALL maintain the same grading logic and point scale
4. WHEN the GraderAgent completes THEN the system SHALL return results compatible with the existing usage logging system

### Requirement 5

**User Story:** As a developer, I want to migrate the ExplainerAgent from Google ADK to FeatherAI, so that chapter content generation uses the new framework.

#### Acceptance Criteria

1. WHEN the ExplainerAgent is initialized THEN the system SHALL use FeatherAI's AIAgent for content generation
2. WHEN the ExplainerAgent receives RAG context THEN the system SHALL incorporate retrieved course documents into the generation process
3. WHEN the ExplainerAgent generates content THEN the system SHALL return output in the expected format for chapter content
4. WHEN the ExplainerAgent uses LoopAgent or complex patterns THEN the system SHALL evaluate FeatherAI alternatives or simplify the implementation

### Requirement 6

**User Story:** As a developer, I want to migrate the TesterAgent from Google ADK to FeatherAI, so that quiz question generation uses the new framework.

#### Acceptance Criteria

1. WHEN the TesterAgent is initialized THEN the system SHALL use FeatherAI's AIAgent with structured output support
2. WHEN the TesterAgent generates questions THEN the system SHALL return structured output with questions array containing MCQ and open-text questions
3. WHEN the TesterAgent processes chapter content THEN the system SHALL generate questions appropriate to the difficulty level and language
4. WHEN the TesterAgent completes THEN the system SHALL return questions compatible with the existing database schema

### Requirement 7

**User Story:** As a developer, I want to migrate the ImageAgent from Google ADK to FeatherAI, so that course image generation uses the new framework.

#### Acceptance Criteria

1. WHEN the ImageAgent is initialized THEN the system SHALL evaluate if FeatherAI supports image generation or retrieval
2. WHEN the ImageAgent generates images THEN the system SHALL return image URLs compatible with the existing storage system
3. WHEN the ImageAgent receives course or chapter descriptions THEN the system SHALL generate or retrieve appropriate images
4. WHEN FeatherAI does not support image generation THEN the system SHALL document the limitation and maintain existing implementation if necessary

### Requirement 8

**User Story:** As a developer, I want to migrate the FlashcardAgent components from Google ADK to FeatherAI, so that flashcard-based learning uses the new framework.

#### Acceptance Criteria

1. WHEN the LearningAgent is initialized THEN the system SHALL use FeatherAI's AIAgent for flashcard learning interactions
2. WHEN the TestingAgent is initialized THEN the system SHALL use FeatherAI's AIAgent for flashcard testing
3. WHEN flashcard agents process requests THEN the system SHALL maintain compatibility with the existing flashcard API
4. WHEN flashcard agents complete THEN the system SHALL return results in the expected format

### Requirement 9

**User Story:** As a developer, I want to update the base agent classes to support FeatherAI, so that all agents share common functionality.

#### Acceptance Criteria

1. WHEN StructuredAgent is refactored THEN the system SHALL remove Google ADK dependencies and use FeatherAI equivalents
2. WHEN base agent classes handle errors THEN the system SHALL maintain the existing retry logic and error handling patterns
3. WHEN base agent classes execute THEN the system SHALL preserve the run method signature for backward compatibility
4. WHEN callback functionality is needed THEN the system SHALL evaluate FeatherAI alternatives to Google ADK's CallbackContext

### Requirement 10

**User Story:** As a developer, I want to update the AgentService to work with FeatherAI agents, so that the service layer coordinates agent interactions correctly.

#### Acceptance Criteria

1. WHEN AgentService initializes agents THEN the system SHALL create FeatherAI-based agent instances instead of Google ADK instances
2. WHEN AgentService calls agent methods THEN the system SHALL use FeatherAI's async execution patterns
3. WHEN AgentService handles responses THEN the system SHALL parse FeatherAI response objects correctly
4. WHEN AgentService manages sessions THEN the system SHALL replace Google ADK's InMemorySessionService with FeatherAI equivalents or remove if unnecessary

### Requirement 11

**User Story:** As a developer, I want to update utility functions to support FeatherAI, so that helper functions work with the new framework.

#### Acceptance Criteria

1. WHEN create_text_query is called THEN the system SHALL create FeatherAI-compatible Prompt objects instead of Google types.Content
2. WHEN create_docs_query is called THEN the system SHALL create FeatherAI-compatible multimodal prompts with documents
3. WHEN load_instruction_from_file is called THEN the system SHALL use FeatherAI's utility function or maintain the existing implementation
4. WHEN utility functions are used THEN the system SHALL maintain backward compatibility with existing agent code

### Requirement 12

**User Story:** As a developer, I want to remove all Google ADK dependencies, so that the codebase only relies on FeatherAI.

#### Acceptance Criteria

1. WHEN the migration is complete THEN the system SHALL have no import statements from google.adk
2. WHEN the migration is complete THEN the system SHALL have no import statements from google.genai.types for agent-related functionality
3. WHEN dependencies are updated THEN the system SHALL remove google-adk from requirements or pyproject.toml
4. WHEN dependencies are updated THEN the system SHALL add feather-ai to the project dependencies

### Requirement 13

**User Story:** As a developer, I want to verify that all migrated agents work correctly, so that I can ensure the migration maintains existing functionality.

#### Acceptance Criteria

1. WHEN each agent is migrated THEN the system SHALL produce output in the same format as before migration
2. WHEN the AgentService is tested THEN the system SHALL successfully create courses, generate content, handle chat, grade answers, and generate questions
3. WHEN error scenarios are tested THEN the system SHALL handle failures gracefully with appropriate error messages
4. WHEN the full course creation workflow is tested THEN the system SHALL maintain end-to-end functionality from user request to course completion
