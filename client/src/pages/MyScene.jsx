import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

function MyScene() {
  const canvasRef = useRef(null)
  const modelRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [orbitEnabled, setOrbitEnabled] = useState(false)
  const controlsRef = useRef(null)
  const isScrollLockedRef = useRef(false)
  const scrollEndPoint = 2200

  // Camera animation state
  const cameraPositionRef = useRef({
    x: 0,
    y: 0.1,
    z: 0.15,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    rotationY: 0,
  })

  // Animation frame reference for smooth animations
  const animationFrameRef = useRef(null)

  // Model dimensions reference to prevent camera clipping
  const modelDimensionsRef = useRef({
    minY: -0.05, // Default minimum Y value to prevent clipping
    boundingBox: null,
  })

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0.2, 0.15)

    if (!canvasRef.current) return
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.outputEncoding = THREE.sRGBEncoding

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add a subtle rim light for better edge definition
    const rimLight = new THREE.DirectionalLight(0x9eafff, 1)
    rimLight.position.set(-5, 2, -5)
    scene.add(rimLight)

    // Load GLB Model
    const loader = new GLTFLoader()
    loader.load(
      "keyboard (1).glb",
      (gltf) => {
        modelRef.current = gltf.scene

        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        gltf.scene.position.x -= center.x
        gltf.scene.position.y -= center.y
        gltf.scene.position.z -= center.z

        // Store model dimensions to prevent camera clipping
        modelDimensionsRef.current.boundingBox = box
        modelDimensionsRef.current.minY = box.min.y + 0.03 // Add a small buffer to prevent clipping

        scene.add(gltf.scene)
      },
      null,
      (error) => {
        console.error("Error loading model:", error)
      },
    )

    // Lerp function for smooth transitions
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor
    }

    // Define camera paths based on scroll position
    const updateCameraTargets = (scrollY) => {
      const scrollMax = 2000 // Maximum scroll value
      const scrollProgress = Math.min(scrollY / scrollMax, 1) // Normalized scroll progress (0-1)

      // Create more interesting camera paths using scroll progress

      // Path 1: Initial view (0-20% scroll)
      if (scrollProgress < 0.2) {
        const pathProgress = scrollProgress / 0.2 // Normalize to 0-1 for this segment
        cameraPositionRef.current.targetX = lerp(0, 0.1, pathProgress)
        cameraPositionRef.current.targetY = lerp(0.1, 0.15, pathProgress)
        cameraPositionRef.current.targetZ = lerp(0.15, 0.12, pathProgress)
        cameraPositionRef.current.rotationY = lerp(0, Math.PI * 0.1, pathProgress)
      }
      // Path 2: Side view (20-40% scroll) - Improved to avoid clipping at y=300
      else if (scrollProgress < 0.4) {
        const pathProgress = (scrollProgress - 0.2) / 0.2
        cameraPositionRef.current.targetX = lerp(0.1, 0.15, pathProgress)

        // Improved Y position to avoid clipping into keyboard at around y=300
        // This is approximately when scrollY is around 300
        if (scrollY >= 250 && scrollY <= 350) {
          // Keep camera above the keyboard surface with a smooth curve
          const clipAvoidanceProgress = (scrollY - 250) / 100 // 0-1 within the critical range
          const safeYPosition = 0.15 - 0.05 * Math.sin(clipAvoidanceProgress * Math.PI)
          cameraPositionRef.current.targetY = Math.max(safeYPosition, 0.08)
        } else {
          cameraPositionRef.current.targetY = lerp(0.15, 0.08, pathProgress)
        }

        // Adjust Z to compensate for Y changes, moving camera slightly back when needed
        const zAdjustment =
          scrollY >= 250 && scrollY <= 350 ? lerp(0.12, 0.14, (scrollY - 250) / 100) : lerp(0.12, 0.1, pathProgress)
        cameraPositionRef.current.targetZ = zAdjustment

        cameraPositionRef.current.rotationY = lerp(Math.PI * 0.1, Math.PI * 0.5, pathProgress)
      }
      // Path 3: Top-down view (40-60% scroll)
      else if (scrollProgress < 0.6) {
        const pathProgress = (scrollProgress - 0.4) / 0.2
        cameraPositionRef.current.targetX = lerp(0.15, 0, pathProgress)

        // Ensure we're safely above the keyboard
        const safeY = 0.2
        cameraPositionRef.current.targetY = lerp(0.08, safeY, pathProgress)

        cameraPositionRef.current.targetZ = lerp(0.1, 0.08, pathProgress)
        cameraPositionRef.current.rotationY = lerp(Math.PI * 0.5, Math.PI, pathProgress)
      }
      // Path 4: Bottom view (60-80% scroll)
      else if (scrollProgress < 0.8) {
        const pathProgress = (scrollProgress - 0.6) / 0.2
        cameraPositionRef.current.targetX = lerp(0, -0.1, pathProgress)
        cameraPositionRef.current.targetY = lerp(0.2, 0.07, pathProgress) // Adjusted to avoid clipping
        cameraPositionRef.current.targetZ = lerp(0.08, 0.12, pathProgress) // Move back slightly to avoid clipping
        cameraPositionRef.current.rotationY = lerp(Math.PI, Math.PI * 1.5, pathProgress)
      }
      // Path 5: Final close-up (80-100% scroll)
      else {
        const pathProgress = (scrollProgress - 0.8) / 0.2
        cameraPositionRef.current.targetX = lerp(-0.1, 0, pathProgress)
        cameraPositionRef.current.targetY = lerp(0.07, 0.1, pathProgress)
        cameraPositionRef.current.targetZ = lerp(0.12, 0.08, pathProgress) // Closer zoom at the end but not too close
        cameraPositionRef.current.rotationY = lerp(Math.PI * 1.5, Math.PI * 2, pathProgress)
      }

      // Apply safety check to prevent camera from going below keyboard surface
      if (modelDimensionsRef.current.boundingBox) {
        cameraPositionRef.current.targetY = Math.max(
          cameraPositionRef.current.targetY,
          modelDimensionsRef.current.minY + 0.05,
        )
      }
    }

    const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enabled = false // Initially disabled
controls.dampingFactor = 0.05
controls.minDistance = 0.05
controls.maxDistance = 0.3
controls.minPolarAngle = Math.PI * 0.1
controls.maxPolarAngle = Math.PI * 0.9
// Add these lines for better control:
controls.rotateSpeed = 0.75
controls.zoomSpeed = 0.8
controls.enablePan = false // Disable panning for simpler interaction
controlsRef.current = controls

const handleScroll = () => {
    const scrollY = window.scrollY
    
    // Check if we've reached the scroll endpoint
    if (scrollY >= scrollEndPoint) {
        
      if (!isScrollLockedRef.current) {
        // Lock the scroll at endpoint
        window.scrollTo(0, scrollEndPoint)
        isScrollLockedRef.current = true
        
        // Enable orbit controls - update this section
        if (controlsRef.current) {
          // Save camera position and reset model rotation before enabling controls
          const currentCameraPos = new THREE.Vector3(
            cameraPositionRef.current.x,
            cameraPositionRef.current.y,
            cameraPositionRef.current.z
          )
          
          camera.position.copy(currentCameraPos)
          camera.lookAt(0, 0, 0)
          
          // Reset model rotation
          if (modelRef.current) {
            modelRef.current.rotation.y = 0
          }
          
          // Set controls target to origin and update
          controlsRef.current.target.set(0, 0, 0)
          controlsRef.current.update()
          
          // Now enable controls and update state
          controlsRef.current.enabled = true
          setOrbitEnabled(true)
          
          // Add message as before...
        }
      }
    } else {
      // Reset lock state when scrolling back up
      if (isScrollLockedRef.current) {
        isScrollLockedRef.current = false
        setOrbitEnabled(false)
        if (controlsRef.current) {
          controlsRef.current.enabled = false
        }
      }
      
      setScrollPosition(scrollY)
      updateCameraTargets(scrollY)
    }
  }

    window.addEventListener("scroll", handleScroll)
    
    const handleWheel = (e) => {
        if (isScrollLockedRef.current && orbitEnabled) {
          // Only prevent default when we're in orbit mode
          // This allows OrbitControls to handle the wheel event for zooming
          e.preventDefault()
        }
      }
    
    window.addEventListener("wheel", handleWheel, { passive: false })

    // Animation Loop with smooth transitions
    const animate = () => {
      if (!orbitEnabled) {
        // Smoothly interpolate camera position when using scroll-based animation
        const easing = 0.05 // Lower value = smoother but slower transitions

        cameraPositionRef.current.x = lerp(cameraPositionRef.current.x, cameraPositionRef.current.targetX, easing)
        cameraPositionRef.current.y = lerp(cameraPositionRef.current.y, cameraPositionRef.current.targetY, easing)
        cameraPositionRef.current.z = lerp(cameraPositionRef.current.z, cameraPositionRef.current.targetZ, easing)

        // Update camera position
        camera.position.set(cameraPositionRef.current.x, cameraPositionRef.current.y, cameraPositionRef.current.z)

        // Rotate the model instead of the camera for more control
        if (modelRef.current) {
          // Smoothly interpolate model rotation
          modelRef.current.rotation.y = lerp(modelRef.current.rotation.y, cameraPositionRef.current.rotationY, easing)
        }

        // Always look at the center
        camera.lookAt(0, 0, 0)
      } else {
        // When orbit controls are enabled, reset model rotation
        if (modelRef.current) {
          modelRef.current.rotation.y = lerp(modelRef.current.rotation.y, 0, 0.05)
        }
      }

      controls.update()
      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Responsive Canvas
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      const orbitMessage = document.getElementById('orbit-message')
      if (orbitMessage) {
        document.body.removeChild(orbitMessage)
      }

      renderer.dispose()
      scene.clear()
      controls.dispose()
    }   
  }, [orbitEnabled])

  const textBlocks = [
    {
      text: "SCROLL TO EXPLORE",
      detail: "Discover the keyboard from every angle as you scroll down.",
      top: "15vh",
      triggerStart: 0,
      triggerEnd: 400,
    },
    {
      text: "PRECISION IN EVERY KEY",
      detail: "Designed with high-quality mechanical switches for maximum durability and response.",
      top: "100vh",
      triggerStart: 300,
      triggerEnd: 800,
    },
    {
      text: "INTERACTIVE 3D EXPERIENCE",
      detail: "Move through an immersive digital showcase of the keyboard's advanced features.",
      top: "160vh",
      triggerStart: 800,
      triggerEnd: 1400,
    },
    {
      text: "DESIGNED FOR INNOVATION",
      detail: "Every aspect is built to enhance your workflow and dominate your gaming sessions.",
      top: "240vh",
      triggerStart: 1400,
      triggerEnd: 1850,
    },
    {
      text: "END OF THE JOURNEY",
      detail: "Thank you for exploring. For gamers. By gamers.",
      top: "300vh",
      triggerStart: 1850,
      triggerEnd: scrollEndPoint,
    },
  ]

  // Calculate max scroll value from the last trigger end
  const maxScroll = textBlocks[textBlocks.length - 1].triggerEnd

  // Calculate progress percentage - ensures it reaches 100% at max scroll
  const scrollProgress = Math.min((scrollPosition / maxScroll) * 100, 100)

  return (
    <>
      {/* Canvas for 3D Scene */}
      <canvas 
        ref={canvasRef}
        style={{
          display: "block",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          
        }}
      />

      {/* Text Elements Appearing from Right */}
      {textBlocks.map(({ text, detail, top, triggerStart, triggerEnd }, index) => {
        const isVisible = scrollPosition >= triggerStart && scrollPosition < triggerEnd

        // Calculate progress within this section for more dynamic animations
        const sectionProgress = Math.min(Math.max((scrollPosition - triggerStart) / (triggerEnd - triggerStart), 0), 1)

        return (
          <div
          key={index}
          style={{
            position: "absolute",
            top,
            right: "3%",
            width: "40%",
            maxWidth: "500px",
            color: "#44d62c", // Razer green for headings
            textAlign: "right",
            transform: isVisible 
              ? `translateX(0) scale(${0.95 + sectionProgress * 0.05})`
              : "translateX(100%)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 2,
          }}
        >
        
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                letterSpacing: "0.15em",
                textShadow: "0 0 10px rgba(68, 214, 44, 0.5)",
                marginBottom: "1rem",
                fontFamily: "'Montserrat', sans-serif", // Razer uses a similar font
              }}
            >
              {text}
            </div>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "400",
                lineHeight: "1.6",
                marginTop: "0.5rem",
                color: "#ffffff", // White for detail text
                opacity: isVisible ? 0.9 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                fontFamily: "'Roboto', sans-serif", // Secondary font
              }}
            >
              {detail}
            </p>

            {/* Razer-style CTA button for each section */}
            {isVisible && (
              <button
              style={{
                backgroundColor: "transparent",
                border: "1px solid #44d62c",
                color: "#44d62c",
                padding: "0.6rem 1.2rem",
                marginTop: "1.5rem",
                fontSize: "0.85rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: sectionProgress > 0.5 ? 1 : 0,
                transform: `translateY(${sectionProgress > 0.5 ? 0 : 20}px)`, // Fixed interpolation
                fontFamily: "'Montserrat', sans-serif",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#44d62c"
                e.currentTarget.style.color = "#000000"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#44d62c"
              }}
            >
              LEARN MORE
            </button>
            
            )}
          </div>
        )
      })}

      {/* Progress indicator - Fixed to show proper progress */}
      {/* Progress Indicator Fix */}
<div
  style={{
    position: "fixed",
    left: "5%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "3px",
    height: "30vh",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    zIndex: 2,
  }}
>
  <div
    style={{
      width: "100%",
      height: `${scrollProgress}%`, // Fixed incorrect template literal
      backgroundColor: "#44d62c",
      transition: "height 0.2s ease-out",
    }}
  />
</div>


      {/* Orbit controls hint - Only shown when orbit controls are active */}
      {orbitEnabled && (
        <div
          style={{
            position: "fixed",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#44d62c",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px 20px",
            borderRadius: "4px",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.8rem",
            zIndex: 10,
            textAlign: "center",
          }}
        >
          CLICK AND DRAG TO ROTATE • SCROLL TO ZOOM
        </div>
      )}

      {/* Debug info - uncomment for development */}
      {/* <div style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "10px",
        zIndex: 100,
        fontFamily: "monospace"
      }}>
        Scroll Y: {scrollPosition}
        <br/>
        Camera Y: {cameraPositionRef.current.y.toFixed(3)}
        <br/>
        Orbit: {orbitEnabled ? "Enabled" : "Disabled"}
      </div> */}

      {/* Extra Content for Scrolling */}
      <div
        style={{
          height: "400vh",
          background: "linear-gradient(#000000, #111111)",
          position: "relative",
          zIndex: 0,
        }}
      ></div>
    </>
  )
}

export default MyScene