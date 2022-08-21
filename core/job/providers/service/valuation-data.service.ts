import { DataService } from 'src/app/provider/service/data.service';
import { EPropertyAccess } from './../enum/property-access.enum';
import { EBuildingService } from './../enum/building-service.enum';
import { EConstructionProp } from './../enum/construction-property.enum';
import { EValuationMethod } from './../enum/valuation-method.enum';
import { EBuildingType, ELandType, EResidenceCategory } from './../enum/building-types.enum';
import { EValuationProperty } from './../enum/valuation-property.enum';
import { EValuationType } from './../enum/valuation-type.enum';
import { EPropertyType } from './../enum/property-type.enum';
import { IGenValue, IGenValueData } from './../../../../provider/model/status.model';
import { Injectable } from '@angular/core';
import { EBuildingUtility } from '../enum/building-utility.enum';

@Injectable()
export class ValuationDataService {

  propertyTypes: IGenValue<EPropertyType>[] = [
    {
      name: this.translations[EPropertyType.LAND],
      value: EPropertyType.LAND
    },
    {
      name: this.translations[EPropertyType.BUILDING],
      value: EPropertyType.BUILDING
    },
    {
      name: this.translations[EPropertyType.MINING_AND_QUARRIES],
      value: EPropertyType.MINING_AND_QUARRIES
    },
    {
      name: this.translations[EPropertyType.OTHER_INFRASTRUCTURES],
      value: EPropertyType.OTHER_INFRASTRUCTURES
    },
  ];

  valuationTypes: IGenValue<EValuationType>[] = [
    {
      name: this.translations[EValuationType.EXPROPRIATION],
      value: EValuationType.EXPROPRIATION
    },
    {
      name: this.translations[EValuationType.AUCTION],
      value: EValuationType.AUCTION
    },
    {
      name: this.translations[EValuationType.MORTGAGE],
      value: EValuationType.MORTGAGE
    },
    {
      name: this.translations[EValuationType.BOOK_KEEPING],
      value: EValuationType.BOOK_KEEPING
    }
  ];

  buildingTypes: IGenValueData<EBuildingType, EResidenceCategory[]>[] = [
    {
      name: this.translations[EBuildingType.RESIDENCIAL],
      value: EBuildingType.RESIDENCIAL,
      type: [
        EResidenceCategory.APARTMENT,
        EResidenceCategory.SINGLE_FAMILY_HOUSE,
        EResidenceCategory.DUPLEX
      ]
    },
    {
      name: this.translations[EBuildingType.COMMERCIAL],
      value: EBuildingType.COMMERCIAL,
      type: [
        EResidenceCategory.OFFICES,
        EResidenceCategory.MALLS,
        EResidenceCategory.RETAIL_SHOPS_KIOSK,
        EResidenceCategory.HOTEL,
        EResidenceCategory.WAREHOUSES,
      ]
    },
    {
      name: this.translations[EBuildingType.INDUSTRIAL],
      value: EBuildingType.INDUSTRIAL,
      type: []
    },
    {
      name: this.translations[EBuildingType.RECREATIONAL_FACILITIES],
      value: EBuildingType.RECREATIONAL_FACILITIES,
      type: []
    },
    {
      name: this.translations[EBuildingType.SPECIAL_PROPERTIES],
      value: EBuildingType.SPECIAL_PROPERTIES,
      type: [
        EResidenceCategory.GAS_PETROL_STATION,
        EResidenceCategory.STADIUMS,
        EResidenceCategory.AIRPORT
      ]
    },
    {
      name: this.translations[EBuildingType.AGRICULTURAL_BUILDING],
      value: EBuildingType.AGRICULTURAL_BUILDING,
      type: []
    },
  ];

  landTypes: IGenValue<ELandType>[] = [
    {
      name: this.translations[ELandType.VACANT_LAND],
      value: ELandType.VACANT_LAND
    },
    {
      name: this.translations[ELandType.LAND_IMPROVEMENT],
      value: ELandType.LAND_IMPROVEMENT
    },
    {
      name: this.translations[ELandType.FOREST],
      value: ELandType.FOREST
    },
    {
      name: this.translations[ELandType.CULTIVABLE_LAND],
      value: ELandType.CULTIVABLE_LAND
    },
    {
      name: this.translations[ELandType.OTHER_NATURAL_RESOURCES],
      value: ELandType.OTHER_NATURAL_RESOURCES
    },
  ]

  residenceCategory: IGenValue<EResidenceCategory>[] = [
    {
      name: this.translations[EResidenceCategory.APARTMENT],
      value: EResidenceCategory.APARTMENT
    },
    {
      name: this.translations[EResidenceCategory.SINGLE_FAMILY_HOUSE],
      value: EResidenceCategory.SINGLE_FAMILY_HOUSE
    },
    {
      name: this.translations[EResidenceCategory.DUPLEX],
      value: EResidenceCategory.DUPLEX
    },
    {
      name: this.translations[EResidenceCategory.OFFICES],
      value: EResidenceCategory.OFFICES
    },
    {
      name: this.translations[EResidenceCategory.MALLS],
      value: EResidenceCategory.MALLS
    },
    {
      name: this.translations[EResidenceCategory.RETAIL_SHOPS_KIOSK],
      value: EResidenceCategory.RETAIL_SHOPS_KIOSK
    },
    {
      name: this.translations[EResidenceCategory.HOTEL],
      value: EResidenceCategory.HOTEL
    },
    {
      name: this.translations[EResidenceCategory.WAREHOUSES],
      value: EResidenceCategory.WAREHOUSES
    },
    {
      name: this.translations[EResidenceCategory.GAS_PETROL_STATION],
      value: EResidenceCategory.GAS_PETROL_STATION
    },
    {
      name: this.translations[EResidenceCategory.STADIUMS],
      value: EResidenceCategory.STADIUMS
    },
    {
      name: this.translations[EResidenceCategory.AIRPORT],
      value: EResidenceCategory.AIRPORT
    }
  ];

  valuationProperties: IGenValueData<EValuationProperty, boolean>[] = [
    {
      name: this.translations[EValuationProperty.STORED],
      value: EValuationProperty.STORED,
      type: true
    },
    {
      name: this.translations[EValuationProperty.FLOOR],
      value: EValuationProperty.FLOOR
    },
    {
      name: this.translations[EValuationProperty.BATHROOMS],
      value: EValuationProperty.BATHROOMS
    },
    {
      name: this.translations[EValuationProperty.KITCHEN],
      value: EValuationProperty.KITCHEN
    },
    {
      name: this.translations[EValuationProperty.OFFICE],
      value: EValuationProperty.OFFICE
    },
    {
      name: this.translations[EValuationProperty.DINING_ROOM],
      value: EValuationProperty.DINING_ROOM
    },
    {
      name: this.translations[EValuationProperty.LIVING_ROOM],
      value: EValuationProperty.LIVING_ROOM
    },
    {
      name: this.translations[EValuationProperty.LIFT],
      value: EValuationProperty.LIFT,
      type: true
    },
    {
      name: this.translations[EValuationProperty.SWIMMING_POOL],
      value: EValuationProperty.SWIMMING_POOL,
      type: true
    },
    {
      name: this.translations[EValuationProperty.GARDEN],
      value: EValuationProperty.GARDEN,
      type: true
    },
    {
      name: this.translations[EValuationProperty.PAVED_AREA],
      value: EValuationProperty.PAVED_AREA,
      type: true
    },
    {
      name: this.translations[EValuationProperty.FENCE],
      value: EValuationProperty.FENCE,
      type: true
    },
    {
      name: this.translations[EValuationProperty.SHARED_WALL],
      value: EValuationProperty.SHARED_WALL,
      type: true
    },
    {
      name: this.translations[EValuationProperty.SHARED_SWIMMING_POOL],
      value: EValuationProperty.SHARED_SWIMMING_POOL,
      type: true
    },
    {
      name: this.translations[EValuationProperty.SHARED_STAIRCASE],
      value: EValuationProperty.SHARED_STAIRCASE,
      type: true
    },
    {
      name: this.translations[EValuationProperty.OFFICE_SPACE],
      value: EValuationProperty.OFFICE_SPACE
    },
    {
      name: this.translations[EValuationProperty.BOARDROOMS],
      value: EValuationProperty.BOARDROOMS
    },
    {
      name: this.translations[EValuationProperty.HALLS],
      value: EValuationProperty.HALLS
    },
    {
      name: this.translations[EValuationProperty.TOILETS_BATHROOMS],
      value: EValuationProperty.TOILETS_BATHROOMS
    },
    {
      name: this.translations[EValuationProperty.AC],
      value: EValuationProperty.AC,
      type: true
    },
    {
      name: this.translations[EValuationProperty.PARKING_UNDERGROUND_OUTSIDE],
      value: EValuationProperty.PARKING_UNDERGROUND_OUTSIDE
    },
    {
      name: this.translations[EValuationProperty.STAIRCASE],
      value: EValuationProperty.STAIRCASE,
      type: true
    },
    {
      name: this.translations[EValuationProperty.STORIES],
      value: EValuationProperty.STORIES
    },
    {
      name: this.translations[EValuationProperty.ARCHIVES_STORES],
      value: EValuationProperty.ARCHIVES_STORES
    },
    {
      name: this.translations[EValuationProperty.STOREY],
      value: EValuationProperty.STOREY
    },
    {
      name: this.translations[EValuationProperty.TOILETES],
      value: EValuationProperty.TOILETES
    },
    {
      name: this.translations[EValuationProperty.SHOPS],
      value: EValuationProperty.SHOPS
    },
    {
      name: this.translations[EValuationProperty.STORAGE_AREA],
      value: EValuationProperty.STORAGE_AREA
    },
    {
      name: this.translations[EValuationProperty.RESTAURANTS],
      value: EValuationProperty.RESTAURANTS
    },
    {
      name: this.translations[EValuationProperty.BARS],
      value: EValuationProperty.BARS
    },
    {
      name: this.translations[EValuationProperty.SAUNA_STEAM],
      value: EValuationProperty.SAUNA_STEAM
    },
    {
      name: this.translations[EValuationProperty.GYM],
      value: EValuationProperty.GYM
    },
    {
      name: this.translations[EValuationProperty.PLAYGROUND],
      value: EValuationProperty.PLAYGROUND
    },
    {
      name: this.translations[EValuationProperty.PARKING],
      value: EValuationProperty.PARKING
    },
    {
      name: this.translations[EValuationProperty.STORAGE_SPACE_SIZE],
      value: EValuationProperty.STORAGE_SPACE_SIZE
    },
    {
      name: this.translations[EValuationProperty.PRODUCTION_SPACE],
      value: EValuationProperty.PRODUCTION_SPACE
    },
    {
      name: this.translations[EValuationProperty.RAW_MATERIAL_STORE],
      value: EValuationProperty.RAW_MATERIAL_STORE
    },
    {
      name: this.translations[EValuationProperty.WAREHOUSE],
      value: EValuationProperty.WAREHOUSE
    },
    {
      name: this.translations[EValuationProperty.CONTROL_ROOM],
      value: EValuationProperty.CONTROL_ROOM
    },
    {
      name: this.translations[EValuationProperty.COLD_ROOM],
      value: EValuationProperty.COLD_ROOM
    },
    {
      name: this.translations[EValuationProperty.ADMINISTRATION_BLOCK],
      value: EValuationProperty.ADMINISTRATION_BLOCK
    },
    {
      name: this.translations[EValuationProperty.DORMITORIES],
      value: EValuationProperty.DORMITORIES
    },
    {
      name: this.translations[EValuationProperty.RESTAURANTS_CANTINE],
      value: EValuationProperty.RESTAURANTS_CANTINE
    },
    {
      name: this.translations[EValuationProperty.CLINIC_FIRSTAID],
      value: EValuationProperty.CLINIC_FIRSTAID
    },
    {
      name: this.translations[EValuationProperty.THEATERS],
      value: EValuationProperty.THEATERS
    },
    {
      name: this.translations[EValuationProperty.WATERFALLS],
      value: EValuationProperty.WATERFALLS
    },
    {
      name: this.translations[EValuationProperty.CANTINE],
      value: EValuationProperty.CANTINE
    },
    {
      name: this.translations[EValuationProperty.NUMBER_OF_PUMPS],
      value: EValuationProperty.NUMBER_OF_PUMPS
    },
    {
      name: this.translations[EValuationProperty.SIZE_OF_STORAGE_SPACE_TANKS],
      value: EValuationProperty.SIZE_OF_STORAGE_SPACE_TANKS
    },
    {
      name: this.translations[EValuationProperty.TARMAC_SIZE],
      value: EValuationProperty.TARMAC_SIZE
    },
    {
      name: this.translations[EValuationProperty.ATTACHED_SHOPS],
      value: EValuationProperty.ATTACHED_SHOPS
    },
    {
      name: this.translations[EValuationProperty.ATTACHED_GARAGE],
      value: EValuationProperty.ATTACHED_GARAGE
    },
    {
      name: this.translations[EValuationProperty.OTHER_TANKS_FOR_OILS],
      value: EValuationProperty.OTHER_TANKS_FOR_OILS
    },
    {
      name: this.translations[EValuationProperty.SITTING_SPACE],
      value: EValuationProperty.SITTING_SPACE
    },
    {
      name: this.translations[EValuationProperty.HOTELS],
      value: EValuationProperty.HOTELS
    },
    {
      name: this.translations[EValuationProperty.SAUNA_STEAM_MASSAGE],
      value: EValuationProperty.SAUNA_STEAM_MASSAGE
    },
    {
      name: this.translations[EValuationProperty.CHANGING_ROOMS],
      value: EValuationProperty.CHANGING_ROOMS
    },
    {
      name: this.translations[EValuationProperty.OFFICE_BLOCKS],
      value: EValuationProperty.OFFICE_BLOCKS
    },
    {
      name: this.translations[EValuationProperty.SIZE],
      value: EValuationProperty.SIZE
    },
    {
      name: this.translations[EValuationProperty.TREES_TYPE],
      value: EValuationProperty.TREES_TYPE
    },
    {
      name: this.translations[EValuationProperty.SIZE_OF_TREES],
      value: EValuationProperty.SIZE_OF_TREES
    },
    {
      name: this.translations[EValuationProperty.DISTANCE],
      value: EValuationProperty.DISTANCE
    },
    {
      name: this.translations[EValuationProperty.TYPES_CROPS],
      value: EValuationProperty.TYPES_CROPS
    },
    {
      name: this.translations[EValuationProperty.TYPE_OF_SOIL],
      value: EValuationProperty.TYPE_OF_SOIL
    },
    {
      name: this.translations[EValuationProperty.BEDROOMS],
      value: EValuationProperty.BEDROOMS
    },
    {
      name: this.translations[EValuationProperty.BUILT_UP_AREA],
      value: EValuationProperty.BUILT_UP_AREA
    },
    {
      name: this.translations[EValuationProperty.GROSS_FLOOR_AREA],
      value: EValuationProperty.GROSS_FLOOR_AREA
    }
  ];

  valuationMethods: IGenValue<EValuationMethod>[] = [
    {
      name: this.translations[EValuationMethod.INCOME_APPROACH],
      value: EValuationMethod.INCOME_APPROACH
    },
    {
      name: this.translations[EValuationMethod.MARKET_APPROACH],
      value: EValuationMethod.MARKET_APPROACH
    },
    {
      name: this.translations[EValuationMethod.COST_APPROACH],
      value: EValuationMethod.COST_APPROACH
    },
  ];

  constructionProperties: IGenValue<EConstructionProp>[] = [
    {
      name: this.translations[EConstructionProp.BURNT_CLAY_BRICKS],
      value: EConstructionProp.BURNT_CLAY_BRICKS
    },
    {
      name: this.translations[EConstructionProp.CONCRETE_BLOCKS],
      value: EConstructionProp.CONCRETE_BLOCKS
    },
    {
      name: this.translations[EConstructionProp.UNBURNT_CLAY_BLOCKS],
      value: EConstructionProp.UNBURNT_CLAY_BLOCKS
    },
    {
      name: this.translations[EConstructionProp.MUD_AND_WATTLE],
      value: EConstructionProp.MUD_AND_WATTLE
    },
    {
      name: this.translations[EConstructionProp.BURNT_BRICKS_UNBRICK_CLAY_BLOCKS],
      value: EConstructionProp.BURNT_BRICKS_UNBRICK_CLAY_BLOCKS
    },
    {
      name: this.translations[EConstructionProp.RULIBA_BRICKS],
      value: EConstructionProp.RULIBA_BRICKS
    }
  ];

  buildingServices: IGenValue<EBuildingService>[] = [
    {
      name: this.translations[EBuildingService.AIR_CONDITIONERS],
      value: EBuildingService.AIR_CONDITIONERS
    },
    {
      name: this.translations[EBuildingService.FIRE_FIGHTING_SYSTEM],
      value: EBuildingService.FIRE_FIGHTING_SYSTEM
    },
    {
      name: this.translations[EBuildingService.SECURITY_SYSTEM_CCTV],
      value: EBuildingService.SECURITY_SYSTEM_CCTV
    },
  ];

  buildingUtilities: IGenValue<EBuildingUtility>[] = [
    {
      name: this.translations[EBuildingUtility.WATER],
      value: EBuildingUtility.WATER
    },
    {
      name: this.translations[EBuildingUtility.ELECTRICITY],
      value: EBuildingUtility.ELECTRICITY
    },
    {
      name: this.translations[EBuildingUtility.TELEPHONE],
      value: EBuildingUtility.TELEPHONE
    },
    {
      name: this.translations[EBuildingUtility.INTERNET],
      value: EBuildingUtility.INTERNET
    }
  ];

  propertyAccess: IGenValue<EPropertyAccess>[] = [
    {
      name: this.translations[EPropertyAccess.PEDESTRIAN_WAY],
      value: EPropertyAccess.PEDESTRIAN_WAY
    },
    {
      name: this.translations[EPropertyAccess.MURRAM_ROAD],
      value: EPropertyAccess.MURRAM_ROAD
    },
    {
      name: this.translations[EPropertyAccess.TARMAC_ROAD],
      value: EPropertyAccess.TARMAC_ROAD
    },
    {
      name: this.translations[EPropertyAccess.COBBLESTONE],
      value: EPropertyAccess.COBBLESTONE
    },
    {
      name: this.translations[EPropertyAccess.PAVED_ROAD],
      value: EPropertyAccess.PAVED_ROAD
    }
  ];


  constructor(private dataService: DataService) { }

  get translations() {
    return this.dataService.translations;
  }

  // init sucategory by array of enums
  initSubCategoryMultiple(arr: EResidenceCategory[]): any[] {
    return this.addMultiple(arr, 'residenceCategory');
  }

  // init valuation properties by array of enums
  initPropertiesMultiple(arr: EValuationProperty[]): any[] {
    return this.addMultiple(arr, 'valuationProperties');
  }

  // add multiple
  addMultiple(arr: any[], scope: string): any[] {
    const multiple = [];
    arr.forEach(_v => {
      multiple.push(this[scope].find(({ value }) => _v === value));
    });
    return multiple;
  }

  // most uses props combo 1
  most1(): EValuationProperty[] {
    return [
      EValuationProperty.SWIMMING_POOL,
      EValuationProperty.GARDEN,
      EValuationProperty.LIFT,
    ]
  }

  // most uses props combo  2
  most2(): EValuationProperty[] {
    return [
      EValuationProperty.STORED,
      EValuationProperty.FLOOR,
      EValuationProperty.BATHROOMS,
      EValuationProperty.KITCHEN,
      EValuationProperty.OFFICE,
      EValuationProperty.DINING_ROOM,
      EValuationProperty.LIVING_ROOM
    ]
  }

  // most used props combo 4
  most4(): EValuationProperty[] {
    return [
      EValuationProperty.AC,
      EValuationProperty.PARKING_UNDERGROUND_OUTSIDE,
      EValuationProperty.STAIRCASE
    ]
  }

  // most used props combo 5
  most5(): EValuationProperty[] {
    return [
      EValuationProperty.TOILETES,
      EValuationProperty.STORAGE_AREA,
      EValuationProperty.LIFT
    ]
  }

  // get props for [apartment, single house]
  apartmentHouse(): EValuationProperty[] {
    return [
      EValuationProperty.BEDROOMS,
      ...this.most1(),
      ...this.most2(),
      EValuationProperty.PAVED_AREA,
      EValuationProperty.BUILT_UP_AREA
    ];
  }

  // get props for [duplex]
  duplex(): EValuationProperty[] {
    return [
      EValuationProperty.BEDROOMS,
      EValuationProperty.SHARED_WALL,
      EValuationProperty.SHARED_SWIMMING_POOL,
      EValuationProperty.SHARED_STAIRCASE,
      ...this.most1(),
      ...this.most2(),
      EValuationProperty.BUILT_UP_AREA
    ];
  }

  // get props for offices
  offices(): EValuationProperty[] {
    return [
      ...this.most4(),
      EValuationProperty.OFFICE_SPACE,
      EValuationProperty.BOARDROOMS,
      EValuationProperty.HALLS,
      EValuationProperty.TOILETS_BATHROOMS,
      EValuationProperty.STORIES,
      EValuationProperty.ARCHIVES_STORES,
      EValuationProperty.LIFT,
      EValuationProperty.GROSS_FLOOR_AREA
    ]
  }

  // get props for malls
  malls(): EValuationProperty[] {
    return [
      ...this.most4(),
      ...this.most5(),
      EValuationProperty.STOREY,
      EValuationProperty.GROSS_FLOOR_AREA
    ]
  }

  // get props for retails
  retail(): EValuationProperty[] {
    return [
      EValuationProperty.SHOPS,
      ...this.malls(),

    ]
  }

  // get props for hotels
  hotel(): EValuationProperty[] {
    return [
      EValuationProperty.RESTAURANTS,
      EValuationProperty.BARS,
      EValuationProperty.SAUNA_STEAM,
      EValuationProperty.GYM,
      EValuationProperty.PLAYGROUND,
      ...this.most4(),
      ...this.most5(),
      EValuationProperty.GROSS_FLOOR_AREA

    ]
  }

  // get props for warehouse
  warehouse(): EValuationProperty[] {
    return [
      ...this.most4(),
      ...this.most5(),
      EValuationProperty.STORAGE_SPACE_SIZE,
      EValuationProperty.GROSS_FLOOR_AREA
    ]
  }

  // get props for industrial
  industrial(): EValuationProperty[] {
    return [
      EValuationProperty.PRODUCTION_SPACE,
      EValuationProperty.RAW_MATERIAL_STORE,
      EValuationProperty.WAREHOUSE,
      EValuationProperty.CONTROL_ROOM,
      EValuationProperty.COLD_ROOM,
      EValuationProperty.ADMINISTRATION_BLOCK,
      EValuationProperty.DORMITORIES,
      EValuationProperty.RESTAURANTS_CANTINE,
      EValuationProperty.CLINIC_FIRSTAID,
      EValuationProperty.AC
    ]
  }

  // get props for recreational
  recreational(): EValuationProperty[] {
    return [
      EValuationProperty.THEATERS,
      EValuationProperty.WATERFALLS,
      EValuationProperty.CANTINE,
      EValuationProperty.PLAYGROUND,
      EValuationProperty.SWIMMING_POOL,
      EValuationProperty.GARDEN,
      EValuationProperty.BARS,
      EValuationProperty.SHOPS
    ]
  }

  // get props for gas/petrol
  gas(): EValuationProperty[] {
    return [
      EValuationProperty.NUMBER_OF_PUMPS,
      EValuationProperty.SIZE_OF_STORAGE_SPACE_TANKS,
      EValuationProperty.TARMAC_SIZE,
      EValuationProperty.ATTACHED_SHOPS,
      EValuationProperty.ATTACHED_GARAGE,
      EValuationProperty.OTHER_TANKS_FOR_OILS
    ]
  }

  // get props for stadium
  stadium(): EValuationProperty[] {
    return [
      EValuationProperty.PLAYGROUND,
      EValuationProperty.SITTING_SPACE,
      EValuationProperty.OFFICE,
      EValuationProperty.HOTELS,
      EValuationProperty.SAUNA_STEAM_MASSAGE,
      EValuationProperty.CHANGING_ROOMS,
      EValuationProperty.GYM,
      EValuationProperty.CHANGING_ROOMS,
      EValuationProperty.CLINIC_FIRSTAID,
      EValuationProperty.PARKING_UNDERGROUND_OUTSIDE,
      EValuationProperty.TOILETES
    ]
  }

  // get props for airport
  airport(): EValuationProperty[] {
    return [
      EValuationProperty.OFFICE_BLOCKS,
      EValuationProperty.TARMAC_SIZE,
      EValuationProperty.PARKING_UNDERGROUND_OUTSIDE,
      EValuationProperty.CONTROL_ROOM
    ]
  }


  // get props for vacant land
  vacant(): EValuationProperty[] {
    return [
      EValuationProperty.SIZE
    ]
  }

  // get props for land improvement
  improved(): EValuationProperty[] {
    return [
      EValuationProperty.FENCE,
      EValuationProperty.GARDEN,
      EValuationProperty.PARKING_UNDERGROUND_OUTSIDE
    ]
  }

  // get props for land forest
  forest(): EValuationProperty[] {
    return [
      EValuationProperty.TREES_TYPE,
      EValuationProperty.SIZE_OF_TREES,
      EValuationProperty.DISTANCE
    ]
  }

  // get props for land cultivable land
  cultivable(): EValuationProperty[] {
    return [
      EValuationProperty.TYPES_CROPS,
      EValuationProperty.TYPE_OF_SOIL
    ]
  }


}
