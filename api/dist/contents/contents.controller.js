"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentsController = void 0;
const common_1 = require("@nestjs/common");
let ContentsController = class ContentsController {
    getHello() {
        return 'hello, world';
    }
    findError() {
        const a = {};
        console.log(a.b.c);
        return '123';
    }
};
exports.ContentsController = ContentsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], ContentsController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('findError'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentsController.prototype, "findError", null);
exports.ContentsController = ContentsController = __decorate([
    (0, common_1.Controller)({
        path: 'contents',
        version: [common_1.VERSION_NEUTRAL, '1']
    })
], ContentsController);
//# sourceMappingURL=contents.controller.js.map