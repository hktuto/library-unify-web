import type { Schema, Struct } from '@strapi/strapi';

export interface ProgramsProgram extends Struct.ComponentSchema {
  collectionName: 'components_programs_programs';
  info: {
    description: '';
    displayName: 'program';
    icon: 'apps';
  };
  attributes: {
    categories: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
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
          'HKRW_kick-off_ceremony_and_Carnival',
        ]
      >;
    contact_EN: Schema.Attribute.String;
    contact_HK: Schema.Attribute.String;
    displayTime_EN: Schema.Attribute.String;
    displayTime_HK: Schema.Attribute.String;
    district: Schema.Attribute.Relation<'oneToOne', 'api::district.district'>;
    endDate: Schema.Attribute.Date;
    endTime: Schema.Attribute.Time;
    liveURL: Schema.Attribute.String;
    location_2_EN: Schema.Attribute.String;
    location_2_HK: Schema.Attribute.String;
    location_EN: Schema.Attribute.Text;
    location_HK: Schema.Attribute.Text;
    name_EN: Schema.Attribute.Text;
    name_HK: Schema.Attribute.String;
    period_EN: Schema.Attribute.Text;
    period_HK: Schema.Attribute.Text;
    phone_EN: Schema.Attribute.String;
    phone_HK: Schema.Attribute.String;
    quota_EN: Schema.Attribute.Text;
    quota_HK: Schema.Attribute.Text;
    register_EN: Schema.Attribute.Text;
    register_HK: Schema.Attribute.Text;
    special_class: Schema.Attribute.String;
    startDate: Schema.Attribute.Date;
    startTime: Schema.Attribute.Time;
    target_EN: Schema.Attribute.Text;
    target_HK: Schema.Attribute.Text;
    videoURL: Schema.Attribute.String;
  };
}

export interface UiMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_menu_items';
  info: {
    description: '';
    displayName: 'menu_item';
    icon: 'bulletList';
  };
  attributes: {
    blank: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    color: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label_EN: Schema.Attribute.String;
    label_HK: Schema.Attribute.String;
    show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    subMenu: Schema.Attribute.Component<'ui.sub-menu', true>;
    url: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    url_CN: Schema.Attribute.String;
    url_EN: Schema.Attribute.String;
    url_HK: Schema.Attribute.String;
  };
}

export interface UiSlide extends Struct.ComponentSchema {
  collectionName: 'components_ui_slides';
  info: {
    description: '';
    displayName: 'Slide';
    icon: 'apps';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    thumbnail: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
    title_EN: Schema.Attribute.Text;
    title_HK: Schema.Attribute.String;
    url_EN: Schema.Attribute.String;
    url_HK: Schema.Attribute.String;
    url_ZH: Schema.Attribute.String;
  };
}

export interface UiSubMenu extends Struct.ComponentSchema {
  collectionName: 'components_ui_sub_menus';
  info: {
    description: '';
    displayName: 'subMenu';
    icon: 'bulletList';
  };
  attributes: {
    blank: Schema.Attribute.Boolean;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label_EN: Schema.Attribute.String;
    label_HK: Schema.Attribute.String;
    show: Schema.Attribute.Boolean;
    showInReadMore: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
    url_CN: Schema.Attribute.String;
    url_EN: Schema.Attribute.String;
    url_HK: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'programs.program': ProgramsProgram;
      'ui.menu-item': UiMenuItem;
      'ui.slide': UiSlide;
      'ui.sub-menu': UiSubMenu;
    }
  }
}
