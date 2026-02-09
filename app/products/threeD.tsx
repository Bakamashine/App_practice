import { useEffect, useState, Suspense } from "react";
import product from "../../api/product";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/loader";

import { Canvas, useLoader, extend, useThree, ThreeElement } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/Addons";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof OrbitControls>
  }
}
extend({ OrbitControls });

function LoadModel({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} />;
}

/// OrbitControls
function Controls() {
  const { camera, gl } = useThree();
  return (
    <orbitControls
      args={[camera, gl.domElement]}
      enableZoom
      enableDamping
      autoRotate
    />
  );
}


/// Scnene
function Scene({ modelUrl }: { modelUrl: string }) {
  return (
    <>
      {/* lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Controls />

      {/* model */}
      <Suspense fallback={null}>
        <LoadModel url={modelUrl} />
      </Suspense>
    </>
  );
}


/// Main page
function ThreeD() {
  const [model, setModel] = useState<string | null>(null);
  const [load, setLoad] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await product.getOnlyModel(id);
          if (response) setModel(response.file);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, [id]);

  if (load) return <Loader />;
  if (!model) return <div>No model</div>;

  return (
    <div className="threeD">
      <Link className="link" to={`/product/${id}`}>
        Назад
      </Link>

      <Canvas
        camera={{
          fov: 75,
          position: [453, 124, 228],
          near: 0.5,
          far: 2000,
        }}
      >
        <Scene modelUrl={model} />
      </Canvas>
    </div>
  );
}

export default ThreeD;
