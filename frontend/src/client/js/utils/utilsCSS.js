export function getLiteralCSSValue(selector, property) {
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === selector) {
          return rule.style[property];
        }
      }
    } catch (e) {
      console.warn('Não foi possível acessar as regras da folha de estilo:', e);
    }
  }
  return null;
}