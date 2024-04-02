interface IJSONFlat {
  [key: string]: string;
}

interface IJSONStructured {
  [key: string]: {
    text: string;
    status?: string;
    notes?: string;
    [property: string]: any;
  };
}

interface IJSONNested {
  [key: string]: string | IJSONNested;
}

type _JSON = IJSONFlat | IJSONStructured | IJSONNested;

interface IDriverFile {
  [sourceKey: string]: {
    [variantKey: string]: IJSONStructured;
  };
}

declare const driver: IDriverFile;

export default driver;
