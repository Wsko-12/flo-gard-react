
import Geometries from './geometries/Geometries';
import Images from './images/Images';
import Textures from './textures/Textures';

export enum EAssetType {
    geometry = 'geometry',
    texture = 'texture',
    image = 'image',
}
export type TAssetsLoadingStatus = (asset: EAssetType , progress: number) => void

class Assets {
    static load = async (loadingCb: TAssetsLoadingStatus) => {
        await Textures.load(loadingCb);
        await Images.load(loadingCb);
        await Geometries.load(loadingCb);
        return true;
    };

    static getTexture(name: string) {
        return Textures.get(name);
    }
    static getGeometry(name: string) {
        return Geometries.get(name);
    }
}

export default Assets;
