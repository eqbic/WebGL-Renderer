#version 300 es
precision highp float;


in vec4 Normal;
in vec3 VertexWorldPosition;

out vec4 FragColor;

struct PointLight
{
    vec3 position;
    vec3 color;
    float strength;
};
#define MAX_NR_LIGHTS 20

uniform int NumberLights;
uniform PointLight pointLights[MAX_NR_LIGHTS];

uniform vec4 objectColor;
uniform vec3 ambientColor;
uniform vec3 viewPosition;

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos)
{
    float specularStrength = light.strength;
    vec3 lightDir = normalize(light.position - fragPos);
    vec3 viewDir = normalize(viewPosition - fragPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    float diff = dot(normal, lightDir);
    vec3 diffuse  = light.color  * diff * light.strength;

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 256.0);
    vec3 specular = specularStrength * spec * light.color;
    vec3 result = diffuse + specular;

    return result;
}

void main(){

        vec3 result = ambientColor;
        vec3 normal = normalize(Normal.xyz);

        for(int i = 0; i < NumberLights; i++)
        {
            result += CalcPointLight(pointLights[i], normal, VertexWorldPosition);
        }
        result *= objectColor.rgb;
        FragColor = vec4(result, 1.0);
}

