import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box } from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DocketForm = (props) => {
  const { open, onClose, data ,setRefresh} = props;
  const [poList, setPOList] = useState([]);
  const initialValues = {
    name: "",
    startTime: "",
    endTime: "",
    hours: "",
    rate: "",
    supplier: "",
    purchaseOrder: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    startTime: Yup.string().required("start time is required"),
    endTime: Yup.string().required("end time is required"),
    hours: Yup.string().required("hours is required"),
    rate: Yup.string().required("rate is required"),
    supplier: Yup.string().required("supplier is required"),
    purchaseOrder: Yup.string().required("purchase order is required"),
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <div>Create Docket</div>
          <div onClick={onClose} style={{ cursor: "pointer" }}>
            X
          </div>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (formData) => {
            let purchaseOrder = JSON.parse(formData.purchaseOrder);
            formData.poNumber = purchaseOrder.PONumber;
            formData.description = purchaseOrder.Description;
            await fetch("https://dockets.onrender.com/createDocket", {
              method: "POST",
              body: JSON.stringify(formData),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            onClose();
            setRefresh(true);
          }}
        >
          {({ isSubmitting, values, setFieldValue, errors }) => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {console.log(errors, values)}
              <Box>
                <label htmlFor="name" style={{ padding: "1rem" }}>
                  Name<span style={{ color: "#E84F2E" }}>*</span>
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter fullname"
                  value={values.name}
                  style={{ width: "60%" }}
                  errors={errors.name}
                />
                <ErrorMessage name="name" component="div" />
              </Box>
              <Box>
                <label htmlFor="startTime" style={{ padding: "1rem" }}>
                  Start Time<span style={{ color: "#E84F2E" }}>*</span>
                </label>
                <Field
                  type="time"
                  name="startTime"
                  placeholder="Enter Start Time"
                  style={{ width: "60%" }}
                />
                <ErrorMessage name="startTime" component="div" />
              </Box>
              <Box>
                <label htmlFor="endTime" style={{ padding: "1rem" }}>
                  End Time<span style={{ color: "#E84F2E" }}>*</span>
                </label>
                <Field
                  type="time"
                  name="endTime"
                  placeholder="Enter End Time"
                  style={{ width: "60%" }}
                />
                <ErrorMessage name="endTime" component="div" />
              </Box>
              <Box>
                <label htmlFor="hours" style={{ padding: "1rem" }}>
                  Hours<span style={{ color: "#E84F2E" }}>*</span>
                </label>
                <Field
                  type="number"
                  name="hours"
                  placeholder="No. of hours worked"
                  style={{ width: "60%" }}
                />
                <ErrorMessage name="endTime" component="div" />
              </Box>
              <Box>
                <label htmlFor="rate" style={{ padding: "1rem" }}>
                  Rate<span style={{ color: "#E84F2E" }}>*</span>
                </label>
                <Field
                  type="number"
                  name="rate"
                  placeholder="Rate per hour"
                  style={{ width: "60%" }}
                />
                <ErrorMessage name="endTime" component="div" />
              </Box>
              <Box>
                <label htmlFor="supplier" style={{ padding: "1rem" }}>
                  Supplier<span style={{ color: "#E84F2E" }}>*</span>
                </label>{" "}
                <select
                  name="supplier"
                  style={{ width: "60%" }}
                  value={values.supplier}
                  onChange={(event) => {
                    setFieldValue("supplier", event.target.value);
                    let poTemp = [];
                    let poNumber = null;
                    for (let i = 0; i < data.length; i++) {
                      if (data[i].Supplier === event.target.value) {
                        poTemp.push(data[i]);
                        poNumber = data[i].PONumber;
                      } else if (data[i].PONumber === poNumber)
                        poTemp.push(data[i]);
                    }
                    setPOList(poTemp);
                  }}
                >
                  <option value="" selected disabled hidden>
                    Select an Option
                  </option>
                  {[...new Set(data.map((item) => item.Supplier))].map((item) =>
                    item ? <option value={item}>{item}</option> : null
                  )}
                </select>
                <ErrorMessage name="supplier" component="div" />
              </Box>
              <Box>
                <label htmlFor="purchaseOrder" style={{ padding: "1rem" }}>
                  Purchase Order<span style={{ color: "#E84F2E" }}>*</span>
                </label>
                <Field
                  as="select"
                  name="purchaseOrder"
                  style={{ width: "60%" }}
                >
                  <option value="" selected disabled hidden>
                    Select an Option
                  </option>
                  {poList.map((item) =>
                    item.PONumber ? (
                      <option
                        value={JSON.stringify({
                          PONumber: item.PONumber,
                          Description: item.Description,
                        })}
                      >
                        {item.PONumber} {item.Description}
                      </option>
                    ) : null
                  )}
                </Field>
                <ErrorMessage name="purchaseOrder" component="div" />
              </Box>

              <button
                type="submit"
                style={{
                  background: "#0000ff5c",
                  borderRadius: "2rem",
                  padding: "0.25rem",
                }}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default DocketForm;
