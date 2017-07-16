import 'match-media'

export const breakpoint = {
  mobile: 600,
  tablet: 1023,
  smallDesktop: 1280,
  desktop: 1599
}

export const isMobile = () =>
  matchMedia(`only screen and (max-width: ${breakpoint.mobile}px)`).matches

export const isTablet = () =>
  matchMedia('only screen and (min-width: 601px) and (max-width: 1023px)').matches

export const isMobileOrTablet = () => matchMedia('only screen and (max-width: 1023px)').matches

export const isSmallDesktop = () =>
  matchMedia('only screen and (min-width: 1024px) and (max-width: 1280px)').matches

export const isDesktop = () =>
  matchMedia('only screen and (min-width: 1281px) and (max-width: 1599px)').matches

export const isLargeDesktop = () => matchMedia('only screen and (min-width: 1600px)').matches
