import type { Schema, Struct } from '@strapi/strapi';

export interface BrandbarBrandBar extends Struct.ComponentSchema {
  collectionName: 'components_brandbar_brand_bars';
  info: {
    displayName: 'Brand Bar';
  };
  attributes: {
    brandcolor: Schema.Attribute.String;
    brandurl: Schema.Attribute.String;
    displayname: Schema.Attribute.String;
    order: Schema.Attribute.String;
  };
}

export interface CalculatorFaq extends Struct.ComponentSchema {
  collectionName: 'components_calculator_faqs';
  info: {
    description: 'Frequently Asked Question';
    displayName: 'FAQ';
    icon: 'question-circle';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface JewellerMetalUrl extends Struct.ComponentSchema {
  collectionName: 'components_jeweller_metal_urls';
  info: {
    description: 'Rate/buy page URL for a specific metal';
    displayName: 'Metal URL';
    icon: 'link';
  };
  attributes: {
    metal: Schema.Attribute.Relation<'oneToOne', 'api::metal.metal'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutAppDownload extends Struct.ComponentSchema {
  collectionName: 'components_layout_app_downloads';
  info: {
    description: 'App store download button';
    displayName: 'App Download';
    icon: 'download';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<['google-play', 'app-store']> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_layout_contact_infos';
  info: {
    description: 'Contact information component';
    displayName: 'Contact Info';
    icon: 'phone';
  };
  attributes: {
    address: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface LayoutLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_links';
  info: {
    description: 'Reusable link component';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LayoutSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_links';
  info: {
    description: 'Social media link with platform identifier';
    displayName: 'Social Link';
    icon: 'hashtag';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      [
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'youtube',
        'tiktok',
        'google',
      ]
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'brandbar.brand-bar': BrandbarBrandBar;
      'calculator.faq': CalculatorFaq;
      'jeweller.metal-url': JewellerMetalUrl;
      'layout.app-download': LayoutAppDownload;
      'layout.contact-info': LayoutContactInfo;
      'layout.link': LayoutLink;
      'layout.social-link': LayoutSocialLink;
    }
  }
}
