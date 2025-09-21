// Content script for the extension
console.log('Terms & Conditions Analyzer content script loaded');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanPage') {
    const result = scanForTermsAndConditions();
    sendResponse(result);
  }
});

function scanForTermsAndConditions() {
  const termsKeywords = [
    'terms of service', 'terms and conditions', 'terms of use', 'user agreement',
    'privacy policy', 'legal', 'terms', 'conditions', 'agreement', 'policy'
  ];

  const links = Array.from(document.querySelectorAll('a[href]'));
  const termsLinks = links.filter(link => {
    const text = link.textContent?.toLowerCase() || '';
    const href = link.getAttribute('href')?.toLowerCase() || '';
    
    return termsKeywords.some(keyword => 
      text.includes(keyword) || href.includes(keyword.replace(/\s+/g, ''))
    );
  });

  // Look for terms content on the current page
  const pageText = document.body.textContent?.toLowerCase() || '';
  const hasTermsContent = termsKeywords.some(keyword => pageText.includes(keyword));

  return {
    termsLinks: termsLinks.map(link => ({
      text: link.textContent?.trim(),
      href: link.href
    })),
    hasTermsContent,
    pageTitle: document.title,
    url: window.location.href
  };
}

// Automatically highlight terms and conditions links
function highlightTermsLinks() {
  const result = scanForTermsAndConditions();
  
  result.termsLinks.forEach(linkData => {
    const link = document.querySelector(`a[href="${linkData.href}"]`);
    if (link) {
      link.style.border = '2px solid #ff6b6b';
      link.style.borderRadius = '3px';
      link.title = 'Terms & Conditions link detected by T&C Analyzer';
    }
  });
}

// Run highlighting after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', highlightTermsLinks);
} else {
  highlightTermsLinks();
}