import { useState } from 'react';

import { Skeleton, Tooltip } from '@heroui/react';
import Image from 'next/image';

interface SkillIconProps {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  tooltip?: string;
}

const SkillIcon = ({
  src,
  width = 64,
  height = 64,
  alt,
  tooltip,
}: SkillIconProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!tooltip) {
    tooltip = alt;
  }

  return (
    <Tooltip content={tooltip} closeDelay={75} isOpen={isOpen}>
      <Skeleton
        isLoaded={isLoaded}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(true)}
        classNames={{
          base: 'animate-zoom-out-center hover:animate-zoom-in-center',
        }}
      >
        <Image
          src={`https://assets.dulapahv.dev/images/${src}`}
          width={width}
          height={height}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
        />
      </Skeleton>
    </Tooltip>
  );
};

export default SkillIcon;
