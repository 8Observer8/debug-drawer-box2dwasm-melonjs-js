import * as me from "melonjs";
import { box2d, initBox2D } from "./init-box2d.js";
import DebugDrawer from "./debug-drawer.js";

me.device.onReady(
    () => {
        if (!me.video.init(300, 300, {
                parent: "screen",
                renderer: me.video.CANVAS,
                scale: "fit",
                antiAlias: true
            })) //
        {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        async function init() {
            await initBox2D();

            class Graphics extends me.Renderable {
                constructor() {
                    super(0, 0, me.game.viewport.width, me.game.viewport.height);
                    this.anchorPoint.set(0, 0);

                    const {
                        b2_dynamicBody,
                        b2BodyDef,
                        b2PolygonShape,
                        b2Vec2,
                        b2World
                    } = box2d;

                    this.currentTime = 0;
                    this.dt = 0;
                    this.lastTime = Date.now();

                    this.world = new b2World();
                    const gravity = new b2Vec2(0, 9.8);
                    this.world.SetGravity(gravity);
                    this.pixelsPerMeter = 30;

                    this.debugDrawer = new DebugDrawer(me.game.renderer, this.pixelsPerMeter);
                    this.world.SetDebugDraw(this.debugDrawer.instance);

                    // Ground
                    const groundBodyDef = new b2BodyDef();
                    groundBodyDef.set_position(new b2Vec2(150 / this.pixelsPerMeter,
                        270 / this.pixelsPerMeter));
                    const groundBody = this.world.CreateBody(groundBodyDef);
                    const groundShape = new b2PolygonShape();
                    groundShape.SetAsBox(130 / this.pixelsPerMeter, 20 / this.pixelsPerMeter);
                    groundBody.CreateFixture(groundShape, 0);

                    // Box
                    const boxBodyDef = new b2BodyDef();
                    boxBodyDef.set_position(new b2Vec2(100 / this.pixelsPerMeter, 30 / this.pixelsPerMeter));
                    boxBodyDef.angle = 30 * Math.PI / 180;
                    boxBodyDef.type = b2_dynamicBody;
                    const boxBody = this.world.CreateBody(boxBodyDef);
                    const boxShape = new b2PolygonShape();
                    boxShape.SetAsBox(30 / this.pixelsPerMeter, 30 / this.pixelsPerMeter);
                    boxBody.CreateFixture(boxShape, 1);
                }

                update(dt) {
                    this.world.Step(dt / 1000, 3, 2);
                    return true;
                }

                draw(renderer) {
                    renderer.clearColor("#000000");
                    renderer.setGlobalAlpha(1);
                    this.world.DebugDraw();
                }
            }

            me.game.world.addChild(new Graphics());
        }
        init();
    });
