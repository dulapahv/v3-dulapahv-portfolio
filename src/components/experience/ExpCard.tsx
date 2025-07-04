import { useState } from 'react';

import { cubicBezier, motion } from 'framer-motion';

import {
  Modal,
  ModalBody,
  ModalContent,
  ScrollShadow,
  Skeleton,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';
import { TbMinusVertical } from 'react-icons/tb';

import { Floaties } from '.';

interface ExpCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  position: string;
  tech: string;
  detail: string[];
  text: string[];
  isReversed?: boolean;
}

const ExpCard = ({
  id,
  title,
  location,
  date,
  position,
  tech,
  detail,
  text,
  isReversed = false,
}: ExpCardProps) => {
  const [isCoverImgLoaded, setIsCoverImgLoaded] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(
    Array(text.length).fill(false)
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleImgLoad = (index: number) => {
    const updatedLoaded = [...isImgLoaded];
    updatedLoaded[index] = true;
    setIsImgLoaded(updatedLoaded);
  };

  return (
    <>
      <Floaties isReversed={isReversed} />
      <div className="mb-8 flex h-full min-h-[28rem] flex-col rounded-md px-4 sm:px-8 md:px-16 lg:flex-row lg:px-24">
        <motion.section
          className={`z-10 mx-0 mt-3 lg:mx-4 lg:mt-0 lg:w-1/2 ${
            isReversed ? 'order-2' : 'order-2 lg:order-1'
          }`}
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          whileInView={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
          transition={{
            ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
            duration: 0.7,
          }}
          viewport={{ once: true }}
        >
          <h1 className="bg-RED px-2 py-1 text-lg font-bold text-WHITE">
            {title}
          </h1>
          <h2 className="flex flex-wrap items-center font-light text-YELLOW-800 dark:text-YELLOW">
            {location}{' '}
            {date && <TbMinusVertical className="text-BLACK dark:text-WHITE" />}{' '}
            {date}
          </h2>
          <h3 className="flex flex-wrap items-center text-BLACK dark:text-WHITE">
            <span className="bg-gradient-to-r from-BLUE from-10% via-PURPLE via-30% to-RED bg-clip-text font-semibold italic text-transparent">
              {position}
            </span>
            {tech && <TbMinusVertical />}
            <span className="text-BLACK dark:text-WHITE">{tech} </span>
          </h3>
          <div className="mb-7 mt-4 flex h-[2px] w-14 flex-col bg-gradient-to-r from-RED to-RED-400" />
          <ul className="ml-5 list-outside list-disc">
            {detail?.map((item, index) => (
              <li
                key={index}
                className="text-pretty text-justify text-BLACK dark:text-WHITE"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.section>
        <motion.figure
          className={`lg:w-1/2 ${
            isReversed
              ? 'order-1 after:rounded-tr-3xl'
              : 'order-1 after:rounded-bl-3xl hover:after:rounded-bl-3xl lg:order-2'
          } cursor-pointer after:pointer-events-none after:absolute after:bottom-0 after:h-10 after:w-fit after:rounded-tr-xl after:bg-BLACK/70 after:pl-4 after:pr-4 after:pt-2 after:text-WHITE after:content-["View_more_images"] hover:after:w-full hover:after:rounded-none`}
          onClick={onOpen}
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          whileInView={{
            transform: 'translateY(0)',
            opacity: 1,
          }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Skeleton
            isLoaded={isCoverImgLoaded}
            classNames={{
              base: `h-full shadow-xl ${
                isReversed ? 'rounded-br-3xl' : 'rounded-bl-3xl'
              }`,
              content: 'h-full',
            }}
          >
            <Image
              src={`https://assets.dulapahv.dev/images/exp/${id}/cover.png`}
              width={1915}
              height={632}
              alt={id + ' cover'}
              onLoad={() => setIsCoverImgLoaded(true)}
              className="h-full max-h-[50rem] object-cover duration-200 hover:brightness-[.85] active:brightness-75"
            />
          </Skeleton>
          {isReversed ? (
            <motion.div
              className="pointer-events-none absolute -bottom-16 right-32 -z-10 h-36 w-screen animate-clip-in-left bg-BLUE opacity-50"
              initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
              whileInView={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              }}
              transition={{ ease: 'easeOut', duration: 0.7 }}
              viewport={{ once: true }}
            />
          ) : (
            <motion.div
              className="pointer-events-none absolute -bottom-16 left-32 -z-10 h-36 w-screen animate-clip-in-right bg-BLUE opacity-50"
              initial={{
                clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
              }}
              whileInView={{
                clipPath: 'polygon(100% 0, 0 0, 0 100%, 100% 100%)',
              }}
              transition={{ ease: 'easeOut', duration: 0.7 }}
              viewport={{ once: true }}
            />
          )}
        </motion.figure>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
          size="3xl"
          classNames={{
            wrapper: 'z-[2147483647] overflow-hidden',
            body: 'p-4 pt-1',
            backdrop: 'z-[2147483647]',
            closeButton:
              'btn btn-circle btn-ghost btn-sm z-[2147483647] p-0 text-lg text-RED hover:bg-RED hover:text-WHITE active:bg-RED/80 md:fixed md:text-2xl',
          }}
        >
          <ModalContent>
            <ModalBody>
              <ScrollShadow size={20}>
                <ul className="flex flex-col items-center">
                  {text?.map((item, index) => (
                    <li key={index}>
                      <h1 className="m-2 text-BLACK dark:text-WHITE">
                        {index + 1}. {item}
                      </h1>
                      <Skeleton
                        isLoaded={isImgLoaded[index]}
                        classNames={{
                          base: 'rounded-lg',
                        }}
                      >
                        <Image
                          src={`https://assets.dulapahv.dev/images/exp/${id}/${index + 1}.png`}
                          width={750}
                          height={500}
                          alt={id + ' ' + index + 1}
                          onLoad={() => handleImgLoad(index)}
                        />
                      </Skeleton>
                    </li>
                  ))}
                </ul>
              </ScrollShadow>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ExpCard;
