// Background service worker for the extension

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Terms & Conditions Analyzer installed');
  
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.local.set({
      settings: {
        autoScan: true,
        highlightLinks: true,
        riskThreshold: 70
      }
    });
  }
});

// Handle tab updates to potentially auto-scan
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const settings = await chrome.storage.local.get(['settings']);
    
    if (settings.settings?.autoScan) {
      // Auto-scan could be implemented here
      console.log('Tab updated, could auto-scan:', tab.url);
    }
  }
});

// Handle messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeTerms') {
    // This would typically call an external API for AI analysis
    // For now, we'll simulate the analysis
    simulateTermsAnalysis(request.data)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ error: error.message }));
    
    return true; // Keep message channel open for async response
  }
});

async function simulateTermsAnalysis(data) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock analysis result
  return {
    riskScore: Math.floor(Math.random() * 40) + 60, // 60-100
    risks: [
      {
        category: 'Privacy',
        score: 85,
        issues: ['Data sharing with third parties', 'Broad data collection']
      },
      {
        category: 'Legal',
        score: 90,
        issues: ['Mandatory arbitration', 'Limited liability']
      },
      {
        category: 'Financial',
        score: 65,
        issues: ['Auto-renewal terms', 'Limited refund policy']
      }
    ],
    summary: 'High risk terms detected with concerning privacy and legal clauses.',
    lastAnalyzed: new Date().toISOString()
  };
}

// Context menu integration (optional)
chrome.contextMenus.create({
  id: 'analyzeTerms',
  title: 'Analyze Terms & Conditions',
  contexts: ['link'],
  targetUrlPatterns: ['*://*/*']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'analyzeTerms') {
    // Open popup or perform analysis
    chrome.action.openPopup();
  }
});