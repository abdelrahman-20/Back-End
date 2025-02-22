class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];

    excludedFields.forEach((value, idx) => {
      delete queryObj[value];
    });

    // Advanced Filtering:
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(lt|gt|gte|lte)\b/g,
      (match) => `$${match}`,
    );

    const parsedQuery = JSON.parse(queryString, (key, value) => {
      if (key.match(/\b(lt|gt|gte|lte)\b/g)) {
        return parseInt(value);
      } else {
        return value; // Return the original value for other keys
      }
    });

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sort() {
    // Sorting:
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    // Field Limiting:
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    // Pagination:
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // if (this.queryString.page) {
    //   const numberOfTours = Tour.countDocuments();
    //   if (skip >= numberOfTours) {
    //     throw new Error("Page Doesn't Exist !!");
    //   }
    // }

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
