import { CacheTypeEnum, SessionTimeoutProcessingEnum, type ProjectConfig } from "@/constants/config";

const setting: ProjectConfig = {
  // Permission-related cache is stored in sessionStorage or localStorage
  authCacheType: CacheTypeEnum.LOCAL,
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
}

export default setting;