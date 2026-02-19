import type { Schema, Struct } from '@strapi/strapi';

export interface SharedMediaItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_media_items';
  info: {
    description: '\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u043C\u0435\u0434\u0438\u0430 (\u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u0432\u0438\u0434\u0435\u043E)';
    displayName: 'Media Item';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    poster: Schema.Attribute.String;
    src: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['image', 'video']> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.media-item': SharedMediaItem;
    }
  }
}
