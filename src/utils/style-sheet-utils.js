/*
 * Given a list of styleSheet-like objects, it returns an array of CSSStyleRule
 * objects.
 *
 * You can use the returned array to easily filter the CSS rules used on a
 * page. For example, the following could be used to find all CSS media rules,
 * and is much shorter than the corresponding code using nested "for loops":
 *
 * ```
 * const queryRules = allCSSRulesAsArray(document.styleSheets)
     .filter(rule => rule.type === CSSRule.MEDIA_RULE);
 * ```
 *
 * The styleSheets parameter accepts any array or array-like list, as long as
 * each object has a cssRules attribute. A StyleSheetList would fit this
 * requirement.
 * See https://developer.mozilla.org/en-US/docs/Web/API/StyleSheetList
 *
 * For example, `document.styleSheets` returns a StyleSheetList.
 *
 * The cssRules attribute is another array-like list.
 * See https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList
 *
 */
export const allCSSRulesAsArray = function(styleSheets) {
  // Convert to an array, and then use reduce.
  return [].slice.call(styleSheets)
    .reduce(function(prev, styleSheet) {

      // The styleSheet might not contain any rules.
      if (styleSheet.cssRules) {
        // Convert the list of rules into an array.
        const rulesAsArray = [].slice.call(styleSheet.cssRules);
        // Use the spread operator to push each individual element onto the
        // return array.
        prev.push(...rulesAsArray);
      }

      return prev;
  }, []);
};


/*
 * Given a CSS Style Rule it will determine if the rule is one of our internal
 * test suite UI rules.
 *
 * There is a small chance a student could use a selector that includes
 * the text we are using below to determine if it's our CSS. In the off chance
 * that happens, it's best to just ask them to rename it differently.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleRule
 *
 */
export const isTestSuiteRule = function(cssStyleRule) {
  if (typeof cssStyleRule.selectorText !== 'undefined' &&
    (
      cssStyleRule.selectorText.includes('fcc_test') ||
      cssStyleRule.selectorText.includes('mocha')
    )
  ) {
    return true;
  }

  return false;
};
