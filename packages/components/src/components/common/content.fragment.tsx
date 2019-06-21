import { h } from '@stencil/core';

/**
 * Common fragment used in widgets to manage status.
 *
 * @param isLoading
 * @param error
 * @param isEmpty
 * @param heading
 * @param errorDescription
 * @param noDataMessage
 * @param fragment
 */
export default function(isLoading, error, isEmpty, heading, errorDescription, noDataMessage, fragment) {
  if (isLoading) {
    return <as-loader class={heading ? 'content as-pb--36' : 'content as-pb--20'}></as-loader>;
  }
  if (error) {
    return <p class='content as-body'>{errorDescription || 'Unexpected error'}</p>;
  }
  if (isEmpty) {
    return <p class='content as-body'>{noDataMessage}</p>;
  }
  return fragment;
}
