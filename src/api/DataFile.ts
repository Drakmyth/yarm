export class DataFile {
    public build?: string;
    public debug: boolean = false;
    public header?: Header;
    public game: Game[] = [];

    constructor(obj: any) {
        obj.build && (this.build = obj.build);
        obj.debug && (this.debug = obj.debug === "yes");
        obj.header && (this.header = new Header(obj.header));
        this.game = [].concat(obj.game).map((g: any) => new Game(g));
    }
}

export class Header {
    public name: string;
    public description: string;
    public category?: string;
    public version: string;
    public date?: string;
    public author: string;
    public email?: string;
    public homepage?: string;
    public url?: string;
    public comment?: string;
    public clrmamepro?: ClrMamePro;
    public romcenter?: RomCenter;

    constructor(obj: any) {
        this.name = obj.name;
        this.description = obj.description;
        obj.category && (this.category = obj.category);
        this.version = obj.version;
        obj.date && (this.date = obj.date);
        this.author = obj.author;
        obj.email && (this.email = obj.email);
        obj.homepage && (this.homepage = obj.homepage);
        obj.url && (this.url = obj.url);
        obj.comment && (this.comment = obj.comment);
        obj.clrmamepro && (this.clrmamepro = new ClrMamePro(obj.clrmamepro));
        obj.romcenter && (this.romcenter = new RomCenter(obj.romcenter));
    }
}

export class Game {
    public name: string;
    public sourcefile?: string;
    public isbios: boolean = false;
    public cloneof?: string;
    public romof?: string;
    public sampleof?: string;
    public board?: string;
    public rebuildto?: string;
    public comment: string[] = [];
    public description: string;
    public year?: string;
    public manufacturer?: string;
    public release: Release[] = [];
    public biosset: BiosSet[] = [];
    public rom: Rom[] = [];
    public disk: Disk[] = [];
    public sample: Sample[] = [];
    public archive: Archive[] = [];

    constructor(obj: any) {
        this.name = obj.name;
        obj.sourcefile && (this.sourcefile = obj.sourcefile);
        obj.isbios && (this.isbios = obj.isbios === "yes");
        obj.cloneof && (this.cloneof = obj.cloneof);
        obj.romof && (this.romof = obj.romof);
        obj.sampleof && (this.sampleof = obj.sampleof);
        obj.board && (this.board = obj.board);
        obj.rebuildto && (this.rebuildto = obj.rebuildto);
        obj.comment && (this.comment = [...obj.comment]);
        this.description = obj.description;
        obj.year && (this.year = obj.year);
        obj.manufacturer && (this.manufacturer = obj.manufacturer);
        obj.release && (this.release = [].concat(obj.release).map((r: any) => new Release(r)));
        obj.biosset && (this.biosset = [].concat(obj.biosset).map((b: any) => new BiosSet(b)));
        obj.rom && (this.rom = [].concat(obj.rom).map((r: any) => new Rom(r)));
        obj.disk && (this.disk = [].concat(obj.disk).map((d: any) => new Disk(d)));
        obj.sample && (this.sample = [].concat(obj.sample).map((s: any) => new Sample(s)));
        obj.archive && (this.archive = [].concat(obj.archive).map((a: any) => new Archive(a)));
    }
}

export class ClrMamePro {
    public header?: string;
    public forcemerging: "none" | "split" | "full" = "split";
    public forcenodump: "obsolete" | "required" | "ignore" = "obsolete";
    public forcepacking: "zip" | "unzip" = "zip";

    constructor(obj: any) {
        obj.header && (this.header = obj.header);
        obj.forcemerging && (this.forcemerging = obj.forcemerging);
        obj.forcenodump && (this.forcenodump = obj.forcenodump);
        obj.forcepacking && (this.forcepacking = obj.forcepacking);
    }
}

export class RomCenter {
    public plugin?: string;
    public rommode: "merged" | "split" | "unmerged" = "split";
    public biosmode: "merged" | "split" | "unmerged" = "split";
    public samplemode: "merged" | "unmerged" = "merged";
    public lockrommode: boolean = false;
    public lockbiosmode: boolean = false;
    public locksamplemode: boolean = false;

    constructor(obj: any) {
        obj.plugin && (this.plugin = obj.plugin);
        obj.rommode && (this.rommode = obj.rommode);
        obj.biosmode && (this.biosmode = obj.biosmode);
        obj.samplemode && (this.samplemode = obj.samplemode);
        obj.lockrommode && (this.lockrommode = obj.lockrommode === "yes");
        obj.lockbiosmode && (this.lockbiosmode = obj.lockbiosmode === "yes");
        obj.locksamplemode && (this.locksamplemode = obj.locksamplemode === "yes");
    }
}

export class Release {
    public name: string;
    public region: string;
    public language?: string;
    public date?: string;
    public default: boolean = false;

    constructor(obj: any) {
        this.name = obj.name;
        this.region = obj.region;
        obj.language && (this.language = obj.language);
        obj.date && (this.date = obj.date);
        obj.default && (this.default = obj.default === "yes");
    }
}

export class BiosSet {
    public name: string;
    public description: string;
    public default: boolean = false;

    constructor(obj: any) {
        this.name = obj.name;
        this.description = obj.description;
        obj.default && (this.default = obj.default === "yes");
    }
}

export class Rom {
    public name: string;
    public size: number;
    public crc?: string;
    public sha1?: string;
    public md5?: string;
    public merge?: string;
    public status: "baddump" | "nodump" | "good" | "verified" = "good";
    public date?: string;

    constructor(obj: any) {
        this.name = obj.name;
        this.size = obj.size;
        obj.crc && (this.crc = obj.crc);
        obj.sha1 && (this.sha1 = obj.sha1);
        obj.md5 && (this.md5 = obj.md5);
        obj.merge && (this.merge = obj.merge);
        obj.status && (this.status = obj.status);
        obj.date && (this.date = obj.date);
    }
}

export class Disk {
    public name: string;
    public sha1?: string;
    public md5?: string;
    public merge?: string;
    public status: "baddump" | "nodump" | "good" | "verified" = "good";

    constructor(obj: any) {
        this.name = obj.name;
        obj.sha1 && (this.sha1 = obj.sha1);
        obj.md5 && (this.md5 = obj.md5);
        obj.merge && (this.merge = obj.merge);
        obj.status && (this.status = obj.status);
    }
}

export class Sample {
    public name: string;

    constructor(obj: any) {
        this.name = obj.name;
    }
}

export class Archive {
    public name: string;

    constructor(obj: any) {
        this.name = obj.name;
    }
}
