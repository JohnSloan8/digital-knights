import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import PageHeader from '@/components/PageHeader'
import levels from '@/data/curriculum.json'

export async function generateMetadata(props: { params: Promise<{ level: string }> }) {
  const params = await props.params
  const levelTitle = decodeURI(params.level)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  const index = levels.findIndex((l) => l.title === levelTitle)
  const displayTitle = index !== -1 ? `Curriculum: Level ${index + 1} - ${levelTitle}` : levelTitle

  return genPageMetadata({ title: displayTitle })
}

export default async function LevelPage(props: { params: Promise<{ level: string }> }) {
  const params = await props.params
  const levelTitle = decodeURI(params.level)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  const index = levels.findIndex((l) => l.title === levelTitle)
  const levelData = levels[index]

  if (!levelData) {
    return (
      <div className="mt-24 text-center">
        <h1 className="text-4xl font-bold text-gray-100">Level Not Found</h1>
      </div>
    )
  }

  const displayTitle = `Curriculum: Level ${index + 1} - ${levelData.title}`

  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader title={displayTitle} description={levelData.description} />

        <div className="py-12">
          {/* Image Strip */}
          <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {levelData.galleryImages?.map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className="relative h-48 overflow-hidden rounded-lg border border-gray-700 shadow-lg"
              >
                <Image
                  src={imgSrc}
                  alt={`${levelTitle} image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {/* Learning Outcomes */}
            <section>
              <h2 className="mb-4 text-2xl leading-8 font-bold tracking-tight text-gray-100">
                Learning Outcomes
              </h2>
              <div className="prose max-w-none text-gray-300">
                <p>{levelData.learningOutcomes}</p>
              </div>
            </section>

            {/* Tools */}
            <section>
              <h2 className="mb-4 text-2xl leading-8 font-bold tracking-tight text-gray-100">
                Tools
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {levelData.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4"
                  >
                    <h3 className="font-bold text-gray-200">{tool.name}</h3>
                    <p className="text-gray-400">{tool.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="mb-4 text-2xl leading-8 font-bold tracking-tight text-gray-100">
                Skills
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {levelData.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4"
                  >
                    <h3 className="font-bold text-gray-200">{skill.name}</h3>
                    <p className="text-gray-400">{skill.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
