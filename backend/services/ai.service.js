const { callAI } = require('../utils/ai.util');
const { matchVolunteers } = require('../ai/matching/matching.engine');
const { generateMissionPlan } = require('../ai/planning/planning.engine');
const { summarizeActivity } = require('../ai/summaries/summaries.engine');
const { detectResourceShortages } = require('../ai/insights/insights.engine');
const { assistAdmin } = require('../ai/copilot/copilot.engine');

/**
 * AI Intelligence Layer (Refactored Service)
 */
const aiService = {
  // Legacy support & Incident Analysis
  analyzeCrisisReport: async (description) => {
    const prompt = `Analyze this disaster response report: "${description}". Extract intent, category, urgency, and location. Return JSON.`;
    return await callAI(prompt);
  },

  // Module-based features
  matchVolunteersForTask: async (task, volunteers) => {
    return await matchVolunteers(task, volunteers);
  },

  recommendInventoryForTask: async (task, inventory) => {
    const prompt = `Recommend 3 critical assets from ${JSON.stringify(inventory)} for mission "${task.title}". Return JSON array.`;
    return await callAI(prompt);
  },

  suggestCareerPath: async (user, recentTasks) => {
    const prompt = `Analyze volunteer "${user.name}" with skills ${user.skills} and recent tasks ${JSON.stringify(recentTasks)}. Suggest 2 new skills and a trending specialist title. Return JSON.`;
    return await callAI(prompt);
  },

  // Live Assistant (Unified Chat)
  handleChat: async (message, context = {}) => {
    const roleRules = {
      volunteer: "Focus on mission details and how they can help.",
      customer: "Focus on general mission progress and safety status. Maintain security.",
      ngo: "Full strategic access. Provide deep resource management advice."
    };

    const prompt = `
    ImpactQuest AI Coordinator Session.
    User Message: "${message}"
    User Role: ${context.user?.role || 'guest'}
    Context: ${JSON.stringify(context)}
    
    Directive: ${roleRules[context.user?.role] || "Be helpful and professional."}
    
    TASK: Provide a highly tactical, professional, and Markdown-formatted response.
    Return ONLY a JSON object with key "content".
    `;

    return await callAI(prompt, "google/gemma-3n-e4b-it", 0.7);
  },

  generateDashboardInsights: async (tasks, inventory) => {
    return await detectResourceShortages(inventory, tasks);
  }
};

module.exports = aiService;
