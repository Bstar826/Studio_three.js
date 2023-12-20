import React, {useEffect, useRef, useState} from 'react'
import { gsap } from "gsap"
import * as THREE from "three"

const HoverEffectOnImage = (props:any) => {

  const [position, setPosition] = useState({x:0, y:0})
  const [scene, setScene] = useState(new THREE.Scene())
  const [viewport, setViewPort] = useState({width:1440, height:450, aspectRatio:2.66})
  const [viewSize, setViewSize] = useState({distance:3, vFov:0.698, height:2.18, width:5.82})
  const [uniforms, setUniforms] = useState({
      uMouse: { value: new THREE.Vector2(0,0) },
      resolution: { value : new THREE.Vector2(1.0, 768/1600)},
      uTexture: { value : new THREE.Texture},
    })

  let imageRef = useRef<HTMLHeadingElement>(null)
  let mouse = new THREE.Vector2() 
  let camera: any
  let container: any  

  function ImageRender(){
    // if(imageRef.current){
      container = imageRef.current
      const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
      container.appendChild( renderer.domElement )

      const viewport = {
        width : container.clientWidth,
        height : container.clientHeight,
        aspectRatio : container.clientWidth / container.clientHeight
      }
      camera = new THREE.PerspectiveCamera( 40, viewport.aspectRatio, 0.1, 100 )
      camera.position.set(0, 0, 3)
      
      const viewSize = {
        distance : camera.position.z,
        vFov : (camera.fov * Math.PI) / 180,
        height : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z,
        width : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * viewport.aspectRatio,
      }
      
      setViewPort(viewport)
      setViewSize(viewSize)
      renderer.setClearColor('#000000', 0)
      renderer.setSize(viewport.width, viewport.height)
      renderer.setPixelRatio(window.devicePixelRatio)

      const loader = new THREE.TextureLoader();
      loader.load(
        props.url,
        function ( _texture ) {       
          const geometry = new THREE.PlaneGeometry(3, 2.3, 32, 32)
          uniforms.uTexture.value = _texture
          uniforms.resolution.value = new THREE.Vector2(1.0,viewSize.height/viewSize.width)
          const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
              }`,
            fragmentShader:`              
              uniform sampler2D uTexture;
              varying vec2 vUv;
              uniform vec2 resolution;
              uniform vec2 uMouse;
              vec4 color = vec4(1.,0.,0.,1.);
              uniform sampler2D tDiffuse;
              uniform float uVelo;
              uniform int uType;

              float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
                uv -= disc_center;
                uv*=resolution;
                float dist = sqrt(dot(uv, uv));
                return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
              }

              void main() {
                vec2 newUV = vUv;
                float c = circle(vUv, uMouse, 0.02, 0.07);
                float r = texture2D(uTexture, newUV.xy += c * (0.03 * .5)).x;
                float g = texture2D(uTexture, newUV.xy += c * (0.03 * .525)).y;
                float b = texture2D(uTexture, newUV.xy += c * (0.03 * .55)).z;
                vec4 color = vec4(r, g, b, 1.);               
                gl_FragColor = color;
              }`
          })
          const Plane = new THREE.Mesh( geometry, material )
          let imageRatio = _texture.image.naturalWidth/_texture.image.naturalHeight
          const scale = new THREE.Vector3(imageRatio, 1, 1)          
          Plane.scale.copy(scale)
          Plane.position.set(0,0,0)
          scene.add(Plane)
        },
        undefined,
        function ( err ) {
          console.error( 'error in texture loading');
        }
      );

      window.addEventListener( 'resize', () => {
        camera.aspect = viewport.width/viewport.height
        camera.updateProjectionMatrix();
        renderer.setSize(viewport.width, viewport.height);
      });

      animate()
      function animate (){
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }
    // }
  }
  
  useEffect(() => {
    mouse.x = (position.x / viewport.width) * 2 - 1
    mouse.y = -(position.y / viewport.height) * 2 + 1
    let x = 0.17 * mouse.x * viewSize.width/2 + 0.5;
    let y = 0.4 * mouse.y * viewSize.height/2 + 0.5;
    uniforms.resolution.value=new THREE.Vector2(1.0, viewSize.height/viewSize.width)
    uniforms.uMouse.value = new THREE.Vector2(x,y)
  })

  useEffect(() => {
    
    if (typeof window !== "undefined"){
      if(imageRef.current){
        ImageRender()
        imageRef.current.addEventListener("mousemove", (event: { offsetX: number; offsetY: number }) => {
          setPosition({x:event.offsetX, y:event.offsetY})
        });
      }
    }
  }, [])

  return (
    <>
      <div className={`w-full h-full overflow-hidden`} ref={imageRef}/>      
    </>
  )
}

export default HoverEffectOnImage