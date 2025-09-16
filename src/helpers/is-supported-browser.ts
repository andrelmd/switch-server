import { SupportedBrowser } from 'puppeteer-core'

export function isSupportedBrowser(
	browser: string,
): asserts browser is SupportedBrowser {
	if (browser !== 'chrome' && browser !== 'firefox')
		throw new Error('Env variable BROWSER_PRODUCT is not valid')
}
