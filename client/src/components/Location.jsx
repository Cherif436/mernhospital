import React from "react";
import { Link } from "react-router-dom";

const Location = () => {
  return (
    <div>
      <div className="max-w-[1540px] mx-auto h-[500px] flex justify-center items-center py-8 mt-4">
        <iframe
          className="w-full"
          height={"450px"}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d77687.61240543892!2d13.322553764126862!3d52.520082445379984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e373f035901%3A0x42120465b5e3b70!2sBerlin%2C%20Allemagne!5e0!3m2!1sfr!2ses!4v1748366078169!5m2!1sfr!2ses"
          title="Google Map"
        >
          <Link to="https://www.gps.ie/">gps vehicle tracker</Link>
        </iframe>
      </div>
    </div>
  );
};

export default Location;