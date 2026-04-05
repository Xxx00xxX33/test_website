import type { StrapiBlock } from '@/lib/strapi';

interface Step {
  stepNumber?: number;
  title: string;
  description?: string;
  icon?: string;
}

export default function ProcessSteps({ data }: { data: StrapiBlock }) {
  const heading = data.heading as string;
  const subtitle = data.subtitle as string;
  const steps = (data.steps as Step[]) || [];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          {heading && (
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              {heading}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-primary-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                {/* Step number */}
                <div className="relative z-10 w-14 h-14 mx-auto mb-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {step.stepNumber || i + 1}
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
