const PIXEL_TO_REM = 16.0;

export function rem(pixels: number): string {
    return `${pixels / PIXEL_TO_REM}rem`;
};

export function boxShadow(borderWidth: number): string {
    let val;
    switch (borderWidth) {
        case 2:
            val = [0.1, 0.1, 0.1];
            break;
        case 8:
            val = [0.3, 0.4, 0.5];
            break;
        case 16:
            val = [0.7, 0.8, 1.1];
            break;
        case 24:
            val = [1, 1.2, 1.6];
            break;
        default:
            return "none";
    }

    return (
        `0 ${val[0]}rem ${val[1]}rem 0 rgba(0, 0, 0, 0.26), ` +
        `0 0 ${val[2]}rem 0 rgba(0, 0, 0, 0.08)`
    );
};
