function extractTextFromPage() {
  function getVisibleText(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return "";
    if (window.getComputedStyle(node).display === "none") return "";

    let textContent = "";
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        textContent += child.textContent.trim() + " ";
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        textContent += getVisibleText(child);
      }
    }
    return textContent;
  }

  function extractFromIframes() {
    const iframes = document.getElementsByTagName("iframe");
    let iframeTexts = [];

    for (let iframe of iframes) {
      try {
        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        let iframeText = getVisibleText(iframeDoc.body);
        if (iframeText.length > 100) {
          iframeTexts.push(iframeText);
        }
      } catch (error) {
        console.warn("Blocked from accessing iframe due to cross-origin policy.");
      }
    }

    return iframeTexts.join("\n\n");
  }

  function extractTermsAndConditions() {
    const keywords = ["Terms of Service", "Terms and Conditions", "Privacy Policy"];
    let pageText = getVisibleText(document.body);
    let iframeText = extractFromIframes();
    pageText += "\n\n" + iframeText;

    const foundTerms = keywords.filter(term => pageText.includes(term));
    return foundTerms.length > 0 ? pageText : "No terms detected on this page.";
  }

  function extractCompanyName() {
    // 1. Try from <title>
    const title = document.title;
    const titleMatch = title.match(/^(.*?) (Terms|Conditions|Privacy|User Agreement)/i);
    if (titleMatch) {
      return titleMatch[1].trim();
    }
  
    // 2. Try from <h1> or <h2>
    const heading = document.querySelector("h1, h2")?.innerText;
    const headingMatch = heading?.match(/^(.*?) (Terms|Conditions|Privacy)/i);
    if (headingMatch) {
      return headingMatch[1].trim();
    }
  
    // 3. Try body text pattern: "between you and <Company>"
    const bodyText = document.body.innerText;
    const betweenMatch = bodyText.match(/between you and ([A-Z][\w\s,&.-]{2,50})/i);
    if (betweenMatch) {
      return betweenMatch[1].trim();
    }
  
    // 4. Try meta tag
    const metaOgSiteName = document.querySelector('meta[property="og:site_name"]')?.content;
    if (metaOgSiteName) {
      return metaOgSiteName.trim();
    }
  
    // 5. Fallback to domain name
    const domain = window.location.hostname.replace("www.", "").split(".")[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }
  

  const result = extractTermsAndConditions();
  const company_name = extractCompanyName();

  chrome.storage.local.set({ termsText: result, company: company_name }, () => {
    console.log("✅ Terms text stored in chrome.storage.local");
  });
}

extractTextFromPage();
