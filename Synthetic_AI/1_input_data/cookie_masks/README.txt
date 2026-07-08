Put binary masks here as .png files, one per clean cookie photo, same
base filename (e.g. cookie_001.png matches clean_cookies/cookie_001.jpg).

White = the region where a synthetic defect should be painted in.
Black = keep the original cookie unchanged.

You can paint these by hand in any image editor, or draw a rough polygon
in a tool like CVAT/Roboflow and export it as a mask image. The white
region's bounding box becomes the YOLO label automatically - no separate
annotation step needed for the synthetic images.
