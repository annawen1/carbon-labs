/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { settings } from '@carbon-labs/utilities/es/settings/index.js';
const { stablePrefix: clabsPrefix } = settings;
import '@carbon/web-components/es/components/tag/index.js';
import '@carbon/web-components/es/components/chat-button/index.js';
import Add16 from '@carbon/web-components/es/icons/add/16.js';
import Upload16 from '@carbon/web-components/es/icons/upload/16.js';
import SendAlt16 from '@carbon/web-components/es/icons/send--alt/16.js';

/**
 * Lit template for code
 *
 * @param {object} customElementClass Class functionality for the custom element
 * @returns {TemplateResult<1>} Lit html template
 */
export function tagListElementTemplate(customElementClass) {
  const {
    _tagList: tagList,
    _invalid: invalid,
    _errorMessage: errorMessage,
    _handleTagClick: handleTagClick,
    actionIcon,
    monoLabel,
    isAction,
    isInLine,
    selectionIndex,
  } = customElementClass;

  return html`<div class="${clabsPrefix}--chat-tag-list">
    ${invalid
      ? html`<div class="${clabsPrefix}--chat-tag-list-error">
          ${errorMessage}
        </div>`
      : html`<div class="${clabsPrefix}--chat-tag-list-container">
          ${tagList.map(
            (value, index) =>
              html` <div
                class="${clabsPrefix}--chat-tag-list-container-cell${isInLine
                  ? '-inline'
                  : ''}">
                <cds-chat-button
                  kind="${selectionIndex[index] ? 'primary' : 'ghost'}"
                  size="sm"
                  type="button"
                  ${isAction ? 'is-quick-action' : ''}
                  data-content="${value}"
                  data-index="${index}"
                  @click="${handleTagClick}">
                  ${monoLabel ? monoLabel : value}
                  ${actionIcon === 'add'
                    ? Add16({ slot: 'icon' })
                    : actionIcon === 'upload'
                    ? Upload16({ slot: 'icon' })
                    : actionIcon === 'send'
                    ? SendAlt16({ slot: 'icon' })
                    : ''}
                </cds-chat-button>
              </div>`
          )}
        </div>`}
  </div>`;
}
