import { RefObject, useState } from 'react';

import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  Skeleton,
  Spinner,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { PiCursorClick } from 'react-icons/pi';
import { TbMinusVertical } from 'react-icons/tb';

import { Captcha, Floaties } from '.';

interface HeaderProps {
  sectionRef: RefObject<HTMLDivElement>;
}

const Header = ({ sectionRef }: HeaderProps) => {
  const [email, setEmail] = useState('' as string);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealEmail, setIsRevealEmail] = useState(false);
  const [isFetchingEmail, setIsFetchingEmail] = useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleCaptchaSuccess = async (token: string) => {
    onClose();
    setIsFetchingEmail(true);
    try {
      const response = await fetch(
        `https://verify.dulapahv.dev/validate-captcha?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setIsFetchingEmail(false);
        setEmail(result.message.email.label);
      } else {
        setIsFetchingEmail(false);
        setEmail(result.message);
      }
    } catch (error) {
      setIsFetchingEmail(false);
      setEmail('Cannot connect to server!');
    }
  };

  return (
    <header className="flex animate-fade-in flex-col overflow-hidden">
      <Floaties />
      <div className="flex h-fit min-h-screen flex-col items-center gap-8 overflow-hidden pt-4 md:pt-8 lg:flex-row lg:justify-around lg:gap-0 lg:pt-0">
        <div className="mx-4 flex w-fit flex-col gap-10 md:mx-8 lg:gap-20">
          <section className="animate-clip-in-left animation-delay-100">
            <h1 className="bg-BLUE p-3 pl-3 text-3xl font-bold uppercase tracking-[0.2em] text-WHITE [text-shadow:0_0_5px_#54f1ff] md:text-4xl lg:pl-6 lg:text-5xl">
              Dulapah Vibulsanti
            </h1>
            <h2 className="flex w-fit flex-wrap items-center bg-BLACK/50 px-3 text-sm text-WHITE dark:bg-WHITE/50 md:text-base">
              NEXT.JS <TbMinusVertical /> TAILWIND CSS <TbMinusVertical />{' '}
              TYPESCRIPT <TbMinusVertical /> FIGMA <TbMinusVertical /> PYTHON{' '}
              <TbMinusVertical /> C/C++
            </h2>
            <div className="flex w-fit flex-wrap items-center gap-x-2 bg-BLACK/10 px-3 *:text-sm *:text-BLACK dark:bg-WHITE md:gap-x-4 *:md:text-base">
              <Link
                href="https://www.linkedin.com/in/dulapahv/"
                isExternal
                showAnchorIcon
                underline="hover"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/dulapahv/"
                isExternal
                showAnchorIcon
                underline="hover"
              >
                GitHub
              </Link>
              {email ? (
                <p className="select-all">{email}</p>
              ) : (
                <>
                  {isFetchingEmail ? (
                    <Spinner color="default" size="sm" />
                  ) : (
                    <Link
                      onPress={() => {
                        setIsRevealEmail(true);
                        onOpen();
                      }}
                      showAnchorIcon
                      anchorIcon={
                        <PiCursorClick className="ml-1 text-sm md:text-base" />
                      }
                      underline="hover"
                      className="cursor-pointer"
                    >
                      Reveal Email
                    </Link>
                  )}
                </>
              )}
            </div>
            <h3 className="flex w-fit flex-wrap items-center gap-x-2 bg-BLACK/10 px-3 *:text-sm *:text-BLACK dark:bg-WHITE md:gap-x-4 *:md:text-base">
              <Link
                href="https://dulapahv.dev/resume"
                isExternal
                showAnchorIcon
                underline="hover"
                className="text-BLACK"
              >
                View Resume
              </Link>
            </h3>
          </section>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            size="xs"
            placement="center"
            classNames={{
              wrapper: 'z-[2147483647] overflow-hidden',
              backdrop: 'z-[2147483647]',
            }}
          >
            <ModalContent>
              <ModalBody>
                {isRevealEmail && (
                  <div className="flex flex-col items-center gap-y-4">
                    <h1 className="text-center text-BLACK dark:text-WHITE">
                      Beep boop. Boop beep?
                    </h1>
                    <div className="relative flex items-center gap-x-4 py-5">
                      <Spinner
                        size="sm"
                        classNames={{
                          circle1: 'border-b-textBlack',
                          circle2: 'border-b-textBlack',
                        }}
                      />
                      <p>Loading Captcha...</p>
                    </div>
                    <Captcha onCaptchaSuccess={handleCaptchaSuccess} />
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
          <section className="flex flex-col gap-4 *:w-fit *:-rotate-6 *:items-center *:px-3 *:py-1 *:text-sm *:font-medium *:uppercase *:text-WHITE sm:*:text-base md:*:text-lg">
            <h3 className="animate-clip-in-left bg-RED animation-delay-100 [text-shadow:0_0_5px_#c3456d]">
              Software Engineer
            </h3>
            <h3 className="animate-clip-in-left bg-YELLOW animation-delay-200 [text-shadow:0_0_5px_#917833]">
              Frontend Developer
            </h3>
            <h3 className="animate-clip-in-left bg-PURPLE animation-delay-300 [text-shadow:0_0_5px_#7948c7]">
              Pursuing Fullstack Developer
            </h3>
          </section>
        </div>
        <figure className="relative mt-4 lg:mt-0">
          <div className="absolute -bottom-16 left-32 h-36 w-screen animate-clip-in-right bg-BLUE opacity-50" />
          <div className="mx-8 flex w-64 min-[375px]:w-72 min-[425px]:w-80 sm:w-96 md:w-[26rem] lg:w-auto">
            <div className="z-[1] w-fit animate-clip-in-left animation-delay-300">
              <Skeleton
                isLoaded={isLoaded}
                classNames={{
                  base: 'rounded-bl-3xl',
                }}
              >
                <Image
                  src="https://assets.dulapahv.dev/images/profile_pic.jpg"
                  width={500}
                  height={500}
                  alt="profile_pic"
                  onLoad={() => setIsLoaded(true)}
                  priority
                />
              </Skeleton>
            </div>
            <div className="absolute aspect-square h-full animate-clip-in-left rounded-bl-3xl bg-BLUE shadow" />
          </div>
        </figure>
      </div>
      <div className="relative bottom-32 z-[1] flex flex-col items-center gap-1 text-center text-2xl text-RED">
        <div className="flex animate-bounce flex-col items-center">
          <BsArrowDownCircleFill
            className="btn btn-circle btn-sm z-[1] cursor-pointer text-RED drop-shadow-md"
            onClick={() => sectionRef.current!.scrollIntoView()}
          />
          <button
            className="btn btn-circle btn-sm pointer-events-none absolute z-0 animate-ping drop-shadow-md"
            aria-label="Scroll to see more"
          />
        </div>
        <p className="text-xs">Scroll to see more</p>
      </div>
    </header>
  );
};

export default Header;
