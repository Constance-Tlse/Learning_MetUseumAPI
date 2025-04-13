export interface PaintingProps {
    objectID: number;
    title: string;
    primaryImage: string;
    constituent: Constituent;
    Measurement: Measurement;
    Tag:Tag;
    AdditionalImageData: AdditionalImageData;
}

interface Constituent {
    constituentID: number;
    role: string;
    name: string;
    constituentULAN_URL: string;
    constituentWikidata_URL: string;
    gender?: string;
}

interface Measurement {
    elementName: string;
    elementDescription: string | null;
    elementMeasurements: {
        Height: number;
        Width: number;
    };
}

interface Tag {
    term: string;
    "AAT URL": string;
}

interface AdditionalImageData extends ImageData {
    artistULAN_URL: string;
    objectDate: string;
    objectBeginDate: number;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    measurements: Measurement[];
    creditLine: string;
    geographyType: string;
    city: string;
    state: string;
    county: string;
    country: string;
    region: string;
    subregion: string;
    locale: string;
    locus: string;
    excavation: string;
    river: string;
    classification: string;
    rightsAndReproduction: string;
    linkResource: string;
    metadataDate: string;
    repository: string;
    objectURL: string;
    tags: Tag[];
    objectWikidata_URL: string;
    isTimelineWork: boolean;
    GalleryNumber: string;
}


interface TagWithWikidata extends Tag {
    Wikidata_URL: string;
}

interface IndexedTagWithWikidata extends TagWithWikidata {
    index: number;
}

interface AdditionalImageData extends ImageData {
    artistULAN_URL: string;
    objectDate: string;
    objectBeginDate: number;
    objectEndDate: number;
    medium: string;
    dimensions: string;
    measurements: Measurement[];
    creditLine: string;
    geographyType: string;
    city: string;
    state: string;
    county: string;
    country: string;
    region: string;
    subregion: string;
    locale: string;
    locus: string;
    excavation: string;
    river: string;
    classification: string;
    rightsAndReproduction: string;
    linkResource: string;
    metadataDate: string;
    repository: string;
    objectURL: string;
    tags: IndexedTagWithWikidata[];
    objectWikidata_URL: string;
    isTimelineWork: boolean;
    GalleryNumber: string;
}

