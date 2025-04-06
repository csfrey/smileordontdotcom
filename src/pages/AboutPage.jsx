import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="grow flex justify-center">
      <div className="w-xl p-2">
        <div className="font-peckham text-5xl text-center my-12">ABOUT</div>
        <div className="font-peckham text-sm">
          Hi, I&apos;m Casey (they/them) and I run SMILE OR DONT Photography in
          Seattle, WA. I started doing this to be a resource to the people in
          Seattle who can't usually afford professional photography, as a way of
          giving back to the community that has done so much for me. I shoot on
          35mm film and I enjoy working with all kinds of budgets. Get in touch
          with me today for a free consultation or to book a shoot.
        </div>
        <div className="flex justify-center my-4">
          <Link
            to="/contact"
            className="font-peckham border-2 rounded px-2 active:translate-y-0.5"
          >
            CONTACT ME
          </Link>
        </div>
        <img src="/images/casey.jpg" className="" />
      </div>
    </div>
  );
};

export default AboutPage;
