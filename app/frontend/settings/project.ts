import { CacheTypeEnum, PermissionModeEnum, type ProjectConfig } from "@/constants/config";

const setting: ProjectConfig = {
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  permissionCacheType: CacheTypeEnum.LOCAL,
}

export default setting;