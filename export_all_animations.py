import bpy
import os
import sys

# Paths
animations_dir = os.path.join(os.getcwd(), "public/static/animation-files/animations")
output_dir = os.path.join(os.getcwd(), "public/static/animation-files")

# FBX Animations to import
fbx_animations = {
    "sword and shield idle.fbx": "Knight.Idle.New",
    "sword and shield slash.fbx": "Knight.Slash.New"
}

# Existing internal animations to include
internal_animations = [
    "Knight.PowerUp"
]

def export_all():
    target_armature_name = "Armature.008"
    target_mesh_name = "Knight.Male.A"
    
    target_armature = bpy.data.objects.get(target_armature_name)
    if not target_armature:
        print(f"Target armature {target_armature_name} not found!")
        return

    if not target_armature.animation_data:
        target_armature.animation_data_create()

    # 1. Import FBX Animations
    for filename, action_name in fbx_animations.items():
        fbx_path = os.path.join(animations_dir, filename)
        if not os.path.exists(fbx_path):
            print(f"File not found: {fbx_path}")
            continue

        print(f"Importing {filename}...")
        bpy.ops.import_scene.fbx(filepath=fbx_path)
        
        imported_armature = bpy.context.active_object
        new_action = None
        if imported_armature and imported_armature.animation_data and imported_armature.animation_data.action:
            new_action = imported_armature.animation_data.action
        
        if new_action:
            new_action.name = action_name
            # Add to NLA
            track = target_armature.animation_data.nla_tracks.new()
            track.name = action_name
            strip = track.strips.new(new_action.name, int(new_action.frame_range[0]), new_action)
            strip.action = new_action
            print(f"Added {action_name} to NLA.")
        
        if imported_armature:
            bpy.data.objects.remove(imported_armature)

    # 2. Add Internal Animations
    for action_name in internal_animations:
        action = bpy.data.actions.get(action_name)
        if action:
            track = target_armature.animation_data.nla_tracks.new()
            track.name = action_name
            strip = track.strips.new(action.name, int(action.frame_range[0]), action)
            strip.action = action
            print(f"Added {action_name} to NLA.")
        else:
            print(f"Internal action {action_name} not found!")

    # 3. Export
    bpy.ops.object.select_all(action='DESELECT')
    mesh_obj = bpy.data.objects.get(target_mesh_name)
    mesh_obj.select_set(True)
    target_armature.select_set(True)
    for child in target_armature.children:
        child.select_set(True)
        
    filename = "Studio Ochi Medieval Knights_Male.A.glb"
    filepath = os.path.join(output_dir, filename)
    
    print(f"Exporting to {filepath}...")
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        check_existing=False,
        use_selection=True,
        export_format='GLB',
        export_animations=True,
        export_nla_strips=True,
        export_frame_range=False,
        export_current_frame=True,
        export_apply=True
    )
    print("Done.")

try:
    export_all()
except Exception as e:
    print(f"Error: {e}")
