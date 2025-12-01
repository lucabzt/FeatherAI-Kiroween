from feather_ai import AIAgent
from dotenv import load_dotenv

 # Load environment variables from the .env file
load_dotenv()

# Initialize the AI agent
agent = AIAgent(model="gpt-4o")

# Get the agent's response to the task
response = agent.run("Write a short poem about the sea.")

# Print the response
print(response.content)