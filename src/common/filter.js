import Util from './util'

/**
 * 格式化JSON
 * @param  {String} json    [JSON字符串]
 * @param  {Object} options [参数]
 * @return {[type]}         [格式化后的字符串]
 */
const getRelationStatus = (status) => {
    let statusDesc = '';
    switch (status) {
        case 1:
            statusDesc = '本人';
            break;
        case 2:
            statusDesc = '配偶';
            break;
        case 3:
            statusDesc = '父母';
            break;
        case 4:
            statusDesc = '子女';
            break;
        case 5:
            statusDesc = '其他';
            break;
        default:
            statusDesc = '本人';
            break
    }
    return statusDesc
};
const getArticleImg = (status) => {
    let imgSrc = '';
    switch (status) {
        case 1:
            imgSrc = require('../assets/images/zhongyi.png');
            break;
        case 2:
            imgSrc =  require('../assets/images/yangsheng.png');
            break;
        case 3:
            imgSrc =  require('../assets/images/xinli.png');
            break;
        case 4:
            imgSrc =  require('../assets/images/yundong.png');
            break;
        case 5:
            imgSrc =  require('../assets/images/meili.png');
            break;
        case 6:
            imgSrc =  require('../assets/images/jiating.png');
            break;
        case 7:
            imgSrc = require( '../assets/images/yuer.png')
            break;
        case 8:
            imgSrc = require( '../assets/images/jiankang.png');
            break
    }
    return imgSrc
};
const getArticleStatus = (status) => {
    let statusDesc = '';
    switch (status) {
        case 1:
            statusDesc = '中医';
            break;
        case 2:
            statusDesc = '养生';
            break;
        case 3:
            statusDesc = '心理';
            break;
        case 4:
            statusDesc = '运动';
            break;
        case 5:
            statusDesc = '美丽';
            break;
        case 6:
            statusDesc = '家庭';
            break;
        case 7:
            statusDesc = '育儿';
            break;
        case 8:
            statusDesc = '健康';
            break
    }
    return statusDesc
};

export default {
    getRelationStatus: getRelationStatus,
    getArticleImg: getArticleImg,
    getArticleStatus: getArticleStatus,

}
