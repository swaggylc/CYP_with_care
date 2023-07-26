// 所有sku接口都有的数据
export interface SkuRes {
  code: number
  msg: string
  ok: boolean
}
// 获取sku列表单个sku的数据
export interface SkuItem {
  id: number
  createTime: string
  updateTime: string
  spuId: number
  price: number
  skuName: string
  skuDesc: string
  weight: string
  tmId: number
  category3Id: null
  skuDefaultImg: string
  isSale: number
  skuImageList: null
  skuAttrValueList: null
  skuSaleAttrValueList: null
}
// 获取sku列表接口返回的数据
export interface SkuListRes extends SkuRes {
  data: {
    records: SkuItem[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

// 获取商品详情接口中单张图片的类型
export interface SkuImageItem {
  id: number
  createTime: string
  updateTime: string
  skuId: number
  imgName: string
  imgUrl: string
  spuImgId: number
  isDefault: string
}

// 获取商品详情接口返回的数据类型
export interface SkuInfoRes extends SkuRes {
  data: {
    id: number
    createTime: string
    updateTime: string
    spuId: number
    price: number
    skuName: string
    skuDesc: string
    weight: string
    tmId: number
    category3Id: number
    skuDefaultImg: string
    isSale: number
    skuImages: SkuImageItem[]
  }
}
