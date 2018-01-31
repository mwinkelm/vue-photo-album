import {each} from "lodash";

export default {
    calculateSrcSet(widths, photo) {
        let srcset = [];
        each(widths, (width) => {
            let realWidth = width;
            if (photo.aspectratio > 1) {
                realWidth = Math.round(realWidth / photo.aspectratio);
            }
            srcset.push(`http://lukas.markuswinkelmann.de/fotos/${width}_${photo.filename} ${realWidth}w`);
        });
        return srcset.join(", ");
    }
}

