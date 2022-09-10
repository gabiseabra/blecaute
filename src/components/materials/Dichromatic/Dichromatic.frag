uniform vec3 diffuse;
uniform vec3 ambient;
uniform vec3 emissive;
uniform float opacity;
uniform float uContrast;

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <gradientmap_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <shadowmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clipping_planes_pars_fragment>

struct Material {
	vec3 diffuseColor;
};

vec3 grey;

vec3 greyscale(vec3 color) {
	float g = dot(color, vec3(0.299, 0.587, 0.114));
	return mix(color, vec3(g), 1.0);
}

vec3 contrast(vec3 color, float a) {
	// return mix(vec3( 0.5 ), color, a) * a;
	return color * a;
}

void RE_Direct( const in IncidentLight directLight, const in GeometricContext geometry, const in Material material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	grey = contrast( greyscale(irradiance), uContrast);
	reflectedLight.directDiffuse = grey * diffuse;
}

void RE_Indirect( const in vec3 irradiance, const in GeometricContext geometry, const in Material material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse = (1.0 - grey) * ambient;
}

#define RE_Direct          RE_Direct
#define RE_IndirectDiffuse RE_Indirect
#define Material_LightProbeLOD( material )	(0)

void main() {
	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	Material material;

	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;

	#include <output_fragment>
}
