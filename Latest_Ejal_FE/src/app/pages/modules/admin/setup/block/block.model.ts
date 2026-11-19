export class Block {
    id: number;
    districtId: number;
    districtName: string;
    blockCode: number;
    blockName: string;
    statusId: number;
    status: string;
    orgId: number;
    orgName: string;
    checked: boolean;
    stateName: string;
}

export class State {
    id: number;
    stateName: string;

}

export class District {
    id: number;
    districtName: string;
    stateId: number;
    name: string;
    statusId: number;
    checked: boolean;
}
