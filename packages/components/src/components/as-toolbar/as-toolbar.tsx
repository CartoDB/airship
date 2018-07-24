import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  shadow: false,
  styleUrls: [
    '../../../../styles/src/core/layout/toolbar/_toolbar.scss',
    './as-toolbar.scss'
  ],
  tag: 'as-toolbar',
})

export class Toolbar {

  public render() {
    return (
      <header>
        <nav class="as-toolbar-main">
          <img
            onclick='_toggleDrawer()'
            class='as-toolbar-main__item as-toolbar-main__toggle'
            src='https://material.io/tools/icons/static/icons/baseline-menu-24px.svg'
            alt=''/>
            <div class="as-toolbar-actions">
              <span class="as-toolbar-main__item">
                <img src='https://material.io/tools/icons/static/icons/baseline-fingerprint-24px.svg' alt="Ajustes">
                  <p>Ajustes</p>
          </span>
                <span class="as-toolbar-main__item">
                  <img src="https://material.io/tools/icons/static/icons/baseline-add_location-24px.svg" alt="Ajustes">
                    <p>Ajustes</p>
          </span>
                  <span class="as-toolbar-main__item">
                    <img src="https://material.io/tools/icons/static/icons/baseline-account_circle-24px.svg" alt="User">
                      <p>User</p>
          </span>
                    <span class="as-toolbar-main__item">
                      <img src="https://material.io/tools/icons/static/icons/baseline-power_settings_new-24px.svg" alt="Rendimiento">
                        <p>Rendimiento</p>
          </span>
        </div>
      </nav>
                  <nav class="as-toolbar-tabs">
                    <span onclick="_showTab0(event)" class="as-toolbar-tabs__item">LEFT SIDEBAR</span>
                    <span onclick="_showTab1(event)" class="as-toolbar-tabs__item as-toolbar-tabs__item--active">MAP</span>
                    <span onclick="_showTab2(event)" class="as-toolbar-tabs__item">RIGHT SIDEBAR</span>
                  </nav>
    </header>




                );









                }


              }
;
