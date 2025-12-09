from pygltflib import GLTF2

def list_animations(path):
    try:
        gltf = GLTF2().load(path)
        print(f"Animations in {path}:")
        if gltf.animations:
            for i, anim in enumerate(gltf.animations):
                print(f"  {i}: {anim.name}")
        else:
            print("  No animations found.")
    except Exception as e:
        print(f"Error reading {path}: {e}")

list_animations("public/static/animation-files/Male.A.glb")
