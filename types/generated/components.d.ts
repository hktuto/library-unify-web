import type { Attribute, Schema } from '@strapi/strapi';

export interface ProgramsProgram extends Schema.Component {
  collectionName: 'components_programs_programs';
  info: {
    description: '';
    displayName: 'program';
    icon: 'apps';
  };
  attributes: {
    categories: Attribute.JSON &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        [
          'World_Book_Day_Creative_Competition',
          'Chinese_Culture_Workshop',
          'Chinese_Culture_Activities',
          'Interactive Storytelling Device',
          'Traditional Performing Art',
          'Hong_Kong_Inter-School_Chinese_Reading_Final_Contest_cum_Award_Ceremony',
          'Read Together for Half an Hour',
          'Other Activities',
          'Handicraft Workshops',
          'Story Sharing Sessions',
          'Online_Reading_Club',
          'HKRW_Fun_Day',
          'HKRW_kick-off_ceremony_and_Carnival'
        ]
      >;
    displayTime_EN: Attribute.String;
    displayTime_HK: Attribute.String;
    district: Attribute.Relation<
      'programs.program',
      'oneToOne',
      'api::district.district'
    >;
    endDate: Attribute.Date;
    endTime: Attribute.Time;
    liveURL: Attribute.String;
    location_EN: Attribute.Text;
    location_HK: Attribute.Text;
    name_EN: Attribute.Text;
    name_HK: Attribute.String;
    period_EN: Attribute.Text;
    period_HK: Attribute.Text;
    quota_EN: Attribute.Text;
    quota_HK: Attribute.Text;
    register_EN: Attribute.Text;
    register_HK: Attribute.Text;
    startDate: Attribute.Date;
    startTime: Attribute.Time;
    target_EN: Attribute.Text;
    target_HK: Attribute.Text;
    videoURL: Attribute.String;
  };
}

export interface UiMenuItem extends Schema.Component {
  collectionName: 'components_ui_menu_items';
  info: {
    description: '';
    displayName: 'menu_item';
    icon: 'bulletList';
  };
  attributes: {
    blank: Attribute.Boolean & Attribute.DefaultTo<false>;
    color: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label_EN: Attribute.String;
    label_HK: Attribute.String;
    readMoreThreshold: Attribute.Integer;
    show: Attribute.Boolean & Attribute.DefaultTo<true>;
    subMenu: Attribute.Component<'ui.sub-menu', true>;
    url: Attribute.String & Attribute.DefaultTo<'#'>;
  };
}

export interface UiSlide extends Schema.Component {
  collectionName: 'components_ui_slides';
  info: {
    description: '';
    displayName: 'Slide';
    icon: 'apps';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    thumbnail: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
    title_EN: Attribute.Text;
    title_HK: Attribute.String;
    url_EN: Attribute.String;
    url_HK: Attribute.String;
    url_ZH: Attribute.String;
  };
}

export interface UiSubMenu extends Schema.Component {
  collectionName: 'components_ui_sub_menus';
  info: {
    description: '';
    displayName: 'subMenu';
    icon: 'bulletList';
  };
  attributes: {
    blank: Attribute.Boolean;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label_EN: Attribute.String;
    label_HK: Attribute.String;
    show: Attribute.Boolean;
    url: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'programs.program': ProgramsProgram;
      'ui.menu-item': UiMenuItem;
      'ui.slide': UiSlide;
      'ui.sub-menu': UiSubMenu;
    }
  }
}
