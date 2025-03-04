/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ComponentType,
  ElementType,
  ForwardedRef,
  ReactNode,
  WeakValidationMap,
  forwardRef,
  useContext,
} from 'react';
import Link, { LinkProps, LinkPropTypes } from './Link';
import { SideNavIcon, SideNavItem, SideNavLinkText } from '@carbon/react';
import { usePrefix } from '../internal/usePrefix';
import { SideNavContext } from './SideNav';
import { SideNavLinkPopover } from './SideNavLinkPopover';

export type SideNavLinkProps<E extends ElementType> = LinkProps<E> & {
  /**
   * Required props for the accessibility label
   */
  'aria-label'?: string;

  /**
   * Required props for the accessibility label
   */

  'aria-labelledby'?: string;
  /**
   * Specify the text content for the link
   */
  children?: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Specify whether the link is the current page
   */
  isActive?: boolean;

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;

  /**
   * Specify if this is a large variation of the SideNavLink
   */
  large?: boolean;

  /**
   * Provide an icon to render in the side navigation link. Should be a React class.
   */
  renderIcon?: ComponentType;

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex?: number;
};

export interface SideNavLinkComponent {
  <E extends ElementType = 'a'>(
    props: SideNavLinkProps<E> & { ref?: ForwardedRef<ElementType> }
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: WeakValidationMap<SideNavLinkProps<any>>;
}

export const SideNavLink: SideNavLinkComponent = forwardRef(
  function SideNavLink(
    {
      children,
      className: customClassName,
      renderIcon: IconElement,
      isActive,
      isSideNavExpanded,
      large = false,
      tabIndex,
      ...rest
    }: SideNavLinkProps<ElementType>,
    ref: ForwardedRef<ElementType>
  ) {
    const { expanded, isRail, navType } = useContext(SideNavContext);
    const prefix = usePrefix();
    const className = cx({
      [`${prefix}--side-nav__link`]: true,
      [`${prefix}--side-nav__link--current`]: isActive,
      [customClassName as string]: !!customClassName,
    });
    const SideNavLinkIcon = IconElement && (
      <SideNavIcon small>
        <IconElement />
      </SideNavIcon>
    );

    if (!expanded && navType === 'panel') {
      return (
        <SideNavLinkPopover align="right" label={children} {...rest}>
          {SideNavLinkIcon}
        </SideNavLinkPopover>
      );
    }

    return (
      <SideNavItem large={large}>
        <Link
          {...rest}
          className={className}
          ref={ref}
          tabIndex={
            tabIndex === undefined
              ? !isSideNavExpanded && !isRail
                ? -1
                : 0
              : tabIndex
          }>
          {SideNavLinkIcon}
          <SideNavLinkText>{children}</SideNavLinkText>
        </Link>
      </SideNavItem>
    );
  }
) as SideNavLinkComponent;

SideNavLink.displayName = 'SideNavLink';
SideNavLink.propTypes = {
  ...LinkPropTypes,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.node as unknown as React.Validator<React.ReactNode>,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the link is the current page
   */
  isActive: PropTypes.bool,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Specify if this is a large variation of the SideNavLink
   */
  large: PropTypes.bool,

  /**
   * Provide an icon to render in the side navigation link. Should be a React class.
   */
  // @ts-expect-error - PropTypes are unable to cover this case.
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the tabIndex of the button. If undefined, it will be applied default validation
   */
  tabIndex: PropTypes.number,
};

// eslint-disable-next-line react/display-name
export const createCustomSideNavLink = (element) => (props) =>
  <SideNavLink element={element} {...props} />;

export default SideNavLink;
