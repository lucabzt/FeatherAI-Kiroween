# Requirements Document

## Introduction

This document outlines the requirements for migrating the Piatto backend from Google ADK (Agent Development Kit) to FeatherAI. The migration involves replacing all Google ADK agent implementations with FeatherAI equivalents while maintaining the same functionality and API contracts. The system currently uses Google ADK for five different agent types: recipe generation, instruction generation, image analysis, image generation, and chat interactions.

## Glossary

- **Google ADK**: Google's Agent Development Kit, the current framework used for AI agent implementations
- **FeatherAI**: The target framework for AI agent implementations, a lightweight alternative to Google ADK
- **Piatto Backend**: The backend system for a recipe management application
- **Agent**: An AI-powered component that processes user requests and generates responses
- **RecipeAgent**: Agent responsible for generating custom cooking recipes
- **InstructionAgent**: Agent that creates step-by-step cooking instructions
- **ImageAnalyzerAgent**: Agent that analyzes food items in uploaded images
- **ImageAgent**: Agent that generates images of recipes
- **ChatAgent**: Agent that handles conversational interactions during cooking sessions
- **AgentService**: Service layer that coordinates interactions between all agents
- **StandardAgent**: Base class for agents that return unstructured text output
- **StructuredAgent**: Base class for agents that return structured JSON output conforming to Pydantic schemas
- **Session Service**: Component managing agent conversation sessions and state

## Requirements

### Requirement 1

**User Story:** As a developer, I want to migrate the RecipeAgent from Google ADK to FeatherAI, so that the system uses a consistent framework for all recipe generation functionality.

#### Acceptance Criteria

1. WHEN the RecipeAgent is initialized THEN the system SHALL use FeatherAI's AIAgent instead of Google ADK's LlmAgent
2. WHEN the RecipeAgent receives a recipe generation request THEN the system SHALL return structured output conforming to the Recipes Pydantic schema
3. WHEN the RecipeAgent processes a request THEN the system SHALL load instructions from the same instruction file used previously
4. WHEN the RecipeAgent completes execution THEN the system SHALL return results in the same format as the original Google ADK implementation
5. WHEN the RecipeAgent encounters an error THEN the system SHALL handle it gracefully with appropriate error messages

### Requirement 2

**User Story:** As a developer, I want to migrate the InstructionAgent from Google ADK to FeatherAI, so that cooking instruction generation uses the new framework.

#### Acceptance Criteria

1. WHEN the InstructionAgent is initialized THEN the system SHALL use FeatherAI's AIAgent with structured output support
2. WHEN the InstructionAgent generates instructions THEN the system SHALL return output conforming to the Instructions Pydantic schema
3. WHEN the InstructionAgent processes a recipe THEN the system SHALL include all required fields including heading, description, animation, and optional timer
4. WHEN the InstructionAgent completes THEN the system SHALL maintain compatibility with the existing database schema for instruction steps

### Requirement 3

**User Story:** As a developer, I want to migrate the ImageAnalyzerAgent from Google ADK to FeatherAI, so that image analysis functionality uses the new framework.

#### Acceptance Criteria

1. WHEN the ImageAnalyzerAgent is initialized THEN the system SHALL use FeatherAI's AIAgent with multimodal support
2. WHEN the ImageAnalyzerAgent receives an image THEN the system SHALL process it using FeatherAI's document handling capabilities
3. WHEN the ImageAnalyzerAgent analyzes an image THEN the system SHALL return a text description of food items found
4. WHEN the ImageAnalyzerAgent processes multimodal input THEN the system SHALL handle both text prompts and image data

### Requirement 4

**User Story:** As a developer, I want to migrate the ImageAgent from Google ADK to FeatherAI, so that recipe image generation uses the new framework.

#### Acceptance Criteria

1. WHEN the ImageAgent is initialized THEN the system SHALL use FeatherAI's AIAgent configured for image generation
2. WHEN the ImageAgent generates an image THEN the system SHALL return image bytes that can be saved to storage
3. WHEN the ImageAgent receives a recipe description THEN the system SHALL generate an appropriate visual representation
4. WHEN the ImageAgent completes THEN the system SHALL return image data in a format compatible with the existing storage system

### Requirement 5

**User Story:** As a developer, I want to migrate the ChatAgent from Google ADK to FeatherAI, so that conversational interactions use the new framework.

#### Acceptance Criteria

1. WHEN the ChatAgent is initialized THEN the system SHALL use FeatherAI's AIAgent for conversational responses
2. WHEN the ChatAgent receives a user question THEN the system SHALL stream responses back to the client
3. WHEN the ChatAgent processes context THEN the system SHALL include recipe details, cooking session state, and conversation history
4. WHEN the ChatAgent generates responses THEN the system SHALL maintain the streaming capability for real-time user feedback

### Requirement 6

**User Story:** As a developer, I want to update the base agent classes to support FeatherAI, so that all agents share common functionality.

#### Acceptance Criteria

1. WHEN StandardAgent is refactored THEN the system SHALL remove Google ADK dependencies and use FeatherAI equivalents
2. WHEN StructuredAgent is refactored THEN the system SHALL support Pydantic schema-based structured output using FeatherAI
3. WHEN base agent classes handle errors THEN the system SHALL maintain the existing retry logic and error handling patterns
4. WHEN base agent classes execute THEN the system SHALL preserve the run method signature for backward compatibility

### Requirement 7

**User Story:** As a developer, I want to update the AgentService to work with FeatherAI agents, so that the service layer coordinates agent interactions correctly.

#### Acceptance Criteria

1. WHEN AgentService initializes agents THEN the system SHALL create FeatherAI-based agent instances instead of Google ADK instances
2. WHEN AgentService calls agent methods THEN the system SHALL use FeatherAI's async execution patterns
3. WHEN AgentService handles responses THEN the system SHALL parse FeatherAI response objects correctly
4. WHEN AgentService manages sessions THEN the system SHALL remove or replace Google ADK's InMemorySessionService if no longer needed

### Requirement 8

**User Story:** As a developer, I want to update utility functions to support FeatherAI, so that helper functions work with the new framework.

#### Acceptance Criteria

1. WHEN create_text_query is called THEN the system SHALL create FeatherAI-compatible Prompt objects instead of Google types.Content
2. WHEN create_docs_query is called THEN the system SHALL create FeatherAI-compatible multimodal prompts with documents
3. WHEN load_instruction_from_file is called THEN the system SHALL use FeatherAI's utility function or maintain the existing implementation
4. WHEN utility functions are used THEN the system SHALL maintain backward compatibility with existing agent code

### Requirement 9

**User Story:** As a developer, I want to remove all Google ADK dependencies, so that the codebase only relies on FeatherAI.

#### Acceptance Criteria

1. WHEN the migration is complete THEN the system SHALL have no import statements from google.adk
2. WHEN the migration is complete THEN the system SHALL have no import statements from google.genai.types for agent-related functionality
3. WHEN dependencies are updated THEN the system SHALL remove google-adk from requirements or pyproject.toml
4. WHEN dependencies are updated THEN the system SHALL add feather-ai to the project dependencies

### Requirement 10

**User Story:** As a developer, I want to verify that all migrated agents work correctly, so that I can ensure the migration maintains existing functionality.

#### Acceptance Criteria

1. WHEN each agent is migrated THEN the system SHALL produce output in the same format as before migration
2. WHEN the AgentService is tested THEN the system SHALL successfully generate recipes, instructions, analyze images, generate images, and handle chat interactions
3. WHEN error scenarios are tested THEN the system SHALL handle failures gracefully with appropriate error messages
4. WHEN the full workflow is tested THEN the system SHALL maintain end-to-end functionality from user request to response
